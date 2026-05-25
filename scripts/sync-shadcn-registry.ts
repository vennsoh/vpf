/* eslint-disable no-console */
/**
 * Sync shadcn/ui examples, blocks, charts, and color themes into this monorepo.
 *
 * - Examples are written under apps/docs/components/examples/<component>/<name>.tsx
 * - Blocks are written under apps/docs/components/blocks/<category>/<slug>/<file>
 * - Charts (a type of block whose name starts with chart-) are written under
 *   apps/docs/components/blocks/charts/<slug>/<file>
 * - Theme CSS variables for theme-stone/zinc/neutral/gray/slate are merged into
 *   packages/ui/src/styles/themes.css and imported from globals.css.
 * - A typed manifest is emitted at apps/docs/lib/registry.generated.ts.
 *
 * Imports referencing @/registry/new-york-v4/{ui,hooks,lib}/* are rewritten to
 * @workspace/ui/* so the synced files use the monorepo's UI package.
 */

import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import * as path from "node:path";

// Always invoked via `pnpm sync:registry` from the repo root.
const REPO_ROOT = process.cwd();
const APPS_DOCS = path.join(REPO_ROOT, "apps/docs");
const EXAMPLES_OUT = path.join(APPS_DOCS, "components/examples");
const BLOCKS_OUT = path.join(APPS_DOCS, "components/blocks");
const REGISTRY_OUT = path.join(APPS_DOCS, "lib/registry.generated.ts");
const THEMES_OUT = path.join(
	REPO_ROOT,
	"packages/ui/src/styles/themes.css"
);
const GLOBALS_CSS = path.join(
	REPO_ROOT,
	"packages/ui/src/styles/globals.css"
);

const REGISTRY_BASE = "https://ui.shadcn.com/r/styles/new-york-v4";
const GH_API = "https://api.github.com/repos/shadcn-ui/ui/contents";
const GH_BRANCH = "main";
const GH_REGISTRY_DIR = "apps/v4/registry/new-york-v4";
const GH_RAW_EXAMPLES = `https://raw.githubusercontent.com/shadcn-ui/ui/${GH_BRANCH}/${GH_REGISTRY_DIR}/examples`;

const THEME_NAMES = ["stone", "zinc", "neutral", "gray", "slate"] as const;

/**
 * Example names that may be missing from the local examples directory
 * (e.g. previously deleted because their sibling files weren't pulled).
 * The script merges these into the fallback list so a rate-limited run
 * can still recover them via the multi-file sibling logic.
 *
 * When GitHub Contents API isn't rate-limited the canonical listing wins
 * and this list is a no-op.
 */
const RECOVER_EXAMPLES = ["form-next-complex", "form-next-demo"] as const;

type RegistryFile = {
	path: string;
	content?: string;
	type?: string;
	target?: string;
};

type RegistryItem = {
	name: string;
	type?: string;
	files?: RegistryFile[];
	cssVars?: {
		light?: Record<string, string>;
		dark?: Record<string, string>;
	};
	description?: string;
};

async function fetchJson<T>(url: string): Promise<T> {
	const res = await fetch(url, {
		headers: { "User-Agent": "vpf-sync-shadcn-registry" },
	});
	if (!res.ok) {
		throw new Error(`GET ${url} -> ${res.status} ${res.statusText}`);
	}
	return (await res.json()) as T;
}

async function fetchTextOrNull(url: string): Promise<string | null> {
	try {
		const res = await fetch(url, {
			headers: { "User-Agent": "vpf-sync-shadcn-registry" },
		});
		if (!res.ok) return null;
		return await res.text();
	} catch {
		return null;
	}
}

/**
 * Some registry examples (e.g. form-next-complex) import sibling files via
 * relative paths (./form-next-complex-action, ./form-next-complex-schema)
 * that are NOT included in the registry JSON payload. Fetch them straight
 * from the shadcn GitHub repo's examples directory.
 */
async function fetchSiblingExample(
	name: string
): Promise<{ filename: string; content: string } | null> {
	for (const ext of ["tsx", "ts", "jsx", "js"]) {
		const content = await fetchTextOrNull(`${GH_RAW_EXAMPLES}/${name}.${ext}`);
		if (content !== null) return { filename: `${name}.${ext}`, content };
	}
	return null;
}

const RELATIVE_IMPORT_RE = /from\s+["']\.\/([\w-]+)["']/g;

/**
 * Walk relative imports in a synced example source, fetch each sibling
 * from GitHub raw, rewrite their imports, write them next to the primary,
 * and recursively follow their imports too. Returns the number of new
 * files written.
 */
async function ensureSiblings(
	componentDir: string,
	rewrittenSource: string,
	alreadyWritten: Set<string>
): Promise<number> {
	const queue: string[] = [];
	function enqueueImports(source: string) {
		for (const m of source.matchAll(RELATIVE_IMPORT_RE)) {
			const sib = m[1];
			if (sib && !alreadyWritten.has(sib)) {
				alreadyWritten.add(sib);
				queue.push(sib);
			}
		}
	}
	enqueueImports(rewrittenSource);
	let written = 0;
	while (queue.length > 0) {
		const sib = queue.shift()!;
		const fetched = await fetchSiblingExample(sib);
		if (!fetched) {
			console.warn(`    ! sibling ${sib} not found on GitHub raw`);
			continue;
		}
		const rewritten = rewriteImports(fetched.content);
		await writeFileEnsuringDir(
			path.join(componentDir, fetched.filename),
			rewritten
		);
		written++;
		enqueueImports(rewritten);
	}
	return written;
}

async function listGithubDir(
	subPath: string
): Promise<Array<{ name: string; type: "file" | "dir" }>> {
	const url = `${GH_API}/${GH_REGISTRY_DIR}/${subPath}?ref=${GH_BRANCH}`;
	return await fetchJson<Array<{ name: string; type: "file" | "dir" }>>(url);
}

/**
 * Try the GitHub Contents API first. If rate-limited (or any failure),
 * fall back to scanning what's already synced locally so the script
 * can still refresh existing items and pull newly-added siblings.
 */
async function listExampleNamesResilient(): Promise<string[]> {
	try {
		const entries = await listGithubDir("examples");
		return entries
			.filter((e) => e.type === "file" && e.name.endsWith(".tsx"))
			.map((e) => e.name.replace(/\.tsx$/, ""));
	} catch (err) {
		console.warn(
			`  ! GitHub API list failed (${(err as Error).message}); falling back to local examples.`
		);
		if (!existsSync(EXAMPLES_OUT)) return [...RECOVER_EXAMPLES];
		const names = new Set<string>(RECOVER_EXAMPLES);
		const components = await readdir(EXAMPLES_OUT, { withFileTypes: true });
		for (const c of components) {
			if (!c.isDirectory()) continue;
			const files = await readdir(path.join(EXAMPLES_OUT, c.name));
			for (const f of files) {
				if (f.endsWith(".tsx")) names.add(f.replace(/\.tsx$/, ""));
			}
		}
		return [...names].sort();
	}
}

type LocalBlockHint = { slug: string; isChart: boolean };

async function listBlockSlugsResilient(): Promise<LocalBlockHint[]> {
	try {
		const [blockEntries, chartEntries] = await Promise.all([
			listGithubDir("blocks"),
			listGithubDir("charts"),
		]);
		const blockSlugs = blockEntries
			.filter((e) => e.type === "dir")
			.map((e) => ({ slug: e.name, isChart: false }));
		const chartSlugs = chartEntries
			.filter((e) => e.type === "file" && e.name.endsWith(".tsx"))
			.map((e) => ({
				slug: e.name.replace(/\.tsx$/, ""),
				isChart: true,
			}));
		return [...blockSlugs, ...chartSlugs];
	} catch (err) {
		console.warn(
			`  ! GitHub API list failed (${(err as Error).message}); falling back to local blocks.`
		);
		if (!existsSync(BLOCKS_OUT)) return [];
		const result: LocalBlockHint[] = [];
		const categories = await readdir(BLOCKS_OUT, { withFileTypes: true });
		for (const cat of categories) {
			if (!cat.isDirectory()) continue;
			const slugs = await readdir(path.join(BLOCKS_OUT, cat.name), {
				withFileTypes: true,
			});
			for (const s of slugs) {
				if (s.isDirectory()) {
					result.push({ slug: s.name, isChart: cat.name === "charts" });
				}
			}
		}
		return result;
	}
}

function rewriteImports(
	source: string,
	context?: { kind: "block"; category: string; slug: string }
): string {
	let out = source;
	out = out.replace(
		/@\/registry\/new-york-v4\/ui\/([\w./-]+)/g,
		"@workspace/ui/components/$1"
	);
	out = out.replace(
		/@\/registry\/new-york-v4\/hooks\/([\w./-]+)/g,
		"@workspace/ui/hooks/$1"
	);
	out = out.replace(
		/@\/registry\/new-york-v4\/lib\/([\w./-]+)/g,
		"@workspace/ui/lib/$1"
	);
	if (context?.kind === "block") {
		// Rewrite intra-block references like
		// `@/registry/new-york-v4/blocks/<slug>/components/foo` so they point
		// at the synced copy under apps/docs.
		const blockBase = `@/components/blocks/${context.category}/${context.slug}`;
		const blockRe = new RegExp(
			`@/registry/new-york-v4/blocks/${context.slug}/([\\w./-]+)`,
			"g"
		);
		out = out.replace(blockRe, `${blockBase}/$1`);
		// Charts referenced from blocks (e.g. dashboard-01 -> chart-*) map to
		// the synced chart copies. Charts are stored under charts/<slug>/<slug>.
		out = out.replace(
			/@\/registry\/new-york-v4\/charts\/([\w-]+)/g,
			(_match, slug: string) => `@/components/blocks/charts/${slug}/${slug}`
		);
	}
	return out;
}

async function writeFileEnsuringDir(
	filePath: string,
	content: string | Buffer
): Promise<void> {
	await mkdir(path.dirname(filePath), { recursive: true });
	await writeFile(filePath, content);
}

function componentFromExampleName(exampleName: string): string {
	// "button-loading" -> "button"; "button-group-input" stays "button"
	// (group by first hyphen segment per plan)
	const first = exampleName.split("-")[0];
	return first || exampleName;
}

function categoryForBlock(slug: string): string {
	if (slug.startsWith("chart-")) return "charts";
	if (slug.startsWith("sidebar-")) return "sidebar";
	if (slug.startsWith("login-")) return "login";
	if (slug.startsWith("signup-")) return "signup";
	if (slug.startsWith("dashboard-")) return "dashboard";
	return "misc";
}

/**
 * Strip the "registry/new-york-v4/blocks/<slug>/" or
 * "registry/new-york-v4/charts/" prefix from a registry file path and
 * return the path that should live underneath
 * apps/docs/components/blocks/<category>/<slug>/.
 */
function blockRelativePath(slug: string, registryPath: string): string {
	const blocksPrefix = `registry/new-york-v4/blocks/${slug}/`;
	if (registryPath.startsWith(blocksPrefix)) {
		return registryPath.slice(blocksPrefix.length);
	}
	const chartsPrefix = `registry/new-york-v4/charts/`;
	if (registryPath.startsWith(chartsPrefix)) {
		return registryPath.slice(chartsPrefix.length);
	}
	// Fallback to the basename so we never write outside the slug dir.
	return path.basename(registryPath);
}

function importPathForExample(component: string, name: string): string {
	return `@/components/examples/${component}/${name}`;
}

function importPathForBlock(
	category: string,
	slug: string,
	relativeNoExt: string
): string {
	return `@/components/blocks/${category}/${slug}/${relativeNoExt}`;
}

type ExampleEntryOut = {
	name: string;
	source: string;
	importPath: string;
};
type BlockEntryOut = {
	slug: string;
	title?: string;
	source: string;
	importPath: string;
};

async function syncExamples(): Promise<Record<string, ExampleEntryOut[]>> {
	console.log("→ Listing examples…");
	const names = await listExampleNamesResilient();
	console.log(`  Found ${names.length} examples`);

	const examplesMap: Record<string, ExampleEntryOut[]> = {};
	let written = 0;

	const concurrency = 12;
	let cursor = 0;
	async function worker() {
		while (cursor < names.length) {
			const i = cursor++;
			const name = names[i];
			if (name === undefined) continue;
			try {
				const item = await fetchJson<RegistryItem>(
					`${REGISTRY_BASE}/${name}.json`
				);
				if (!item.files || item.files.length === 0) continue;
				// Most examples are a single file; some have helper files. Treat
				// the first registry:example file as the canonical entry and
				// write any extra files alongside it (preserving basename).
				const component = componentFromExampleName(name);
				const componentDir = path.join(EXAMPLES_OUT, component);
				let primaryRelativeNoExt: string | null = null;
				let primarySource = "";
				const writtenSiblings = new Set<string>();
				for (const file of item.files) {
					if (!file.content) continue;
					const rewritten = rewriteImports(file.content);
					const base = path.basename(file.path);
					const target = path.join(componentDir, base);
					await writeFileEnsuringDir(target, rewritten);
					written++;
					writtenSiblings.add(base.replace(/\.tsx?$/, ""));
					if (
						primaryRelativeNoExt === null &&
						(file.type === "registry:example" ||
							base === `${name}.tsx`)
					) {
						primaryRelativeNoExt = base.replace(/\.tsx?$/, "");
						primarySource = rewritten;
					}
				}
				if (primaryRelativeNoExt === null && item.files[0]?.content) {
					// Fallback if no explicit example file type matched.
					const base = path.basename(item.files[0].path);
					primaryRelativeNoExt = base.replace(/\.tsx?$/, "");
					primarySource = rewriteImports(item.files[0].content);
					writtenSiblings.add(primaryRelativeNoExt);
				}
				if (primaryRelativeNoExt !== null) {
					written += await ensureSiblings(
						componentDir,
						primarySource,
						writtenSiblings
					);
					(examplesMap[component] ??= []).push({
						name,
						source: primarySource,
						importPath: importPathForExample(
							component,
							primaryRelativeNoExt
						),
					});
				}
			} catch (err) {
				console.warn(`  ! example ${name} failed: ${(err as Error).message}`);
			}
		}
	}
	await Promise.all(Array.from({ length: concurrency }, worker));

	for (const list of Object.values(examplesMap)) {
		list.sort((a, b) => a.name.localeCompare(b.name));
	}
	console.log(`  Wrote ${written} example files`);
	return examplesMap;
}

async function syncBlocks(): Promise<Record<string, BlockEntryOut[]>> {
	console.log("→ Listing blocks + charts…");
	const [hints, blocksMeta] = await Promise.all([
		listBlockSlugsResilient(),
		fetchJson<Array<{ name: string; description?: string }>>(
			"https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/__blocks__.json"
		),
	]);
	const metaByName = new Map(blocksMeta.map((m) => [m.name, m] as const));

	const allSlugs = hints.map((h) => h.slug);
	const chartCount = hints.filter((h) => h.isChart).length;
	console.log(
		`  Found ${allSlugs.length - chartCount} blocks + ${chartCount} charts`
	);

	const blocksMap: Record<string, BlockEntryOut[]> = {};
	let written = 0;

	const concurrency = 12;
	let cursor = 0;
	async function worker() {
		while (cursor < allSlugs.length) {
			const slug = allSlugs[cursor++];
			if (slug === undefined) continue;
			const category = categoryForBlock(slug);
			try {
				const item = await fetchJson<RegistryItem>(
					`${REGISTRY_BASE}/${slug}.json`
				);
				if (!item.files || item.files.length === 0) continue;
				let entrySource = "";
				let entryRelativeNoExt: string | null = null;
				for (const file of item.files) {
					if (!file.content) continue;
					const relative = blockRelativePath(slug, file.path);
					const target = path.join(
						BLOCKS_OUT,
						category,
						slug,
						relative
					);
					const isTextual = /\.(tsx?|css|json|md|mdx|js|jsx|svg)$/.test(
						relative
					);
					const content = isTextual
						? rewriteImports(file.content, {
								kind: "block",
								category,
								slug,
							})
						: file.content;
					await writeFileEnsuringDir(target, content);
					written++;
					// Prefer page.tsx as the entry, then any registry:page,
					// then the file matching the slug, then the first .tsx.
					const noExt = relative.replace(/\.tsx?$/, "");
					const isPage =
						file.type === "registry:page" ||
						relative === "page.tsx" ||
						relative === `${slug}.tsx`;
					if (
						(entryRelativeNoExt === null && relative.endsWith(".tsx")) ||
						isPage
					) {
						if (isPage || entryRelativeNoExt === null) {
							entryRelativeNoExt = noExt;
							entrySource = isTextual
								? content
								: file.content;
						}
					}
				}
				if (entryRelativeNoExt !== null) {
					const meta = metaByName.get(slug);
					(blocksMap[category] ??= []).push({
						slug,
						title: meta?.description,
						source: entrySource,
						importPath: importPathForBlock(
							category,
							slug,
							entryRelativeNoExt
						),
					});
				}
			} catch (err) {
				console.warn(`  ! block ${slug} failed: ${(err as Error).message}`);
			}
		}
	}
	await Promise.all(Array.from({ length: concurrency }, worker));

	for (const list of Object.values(blocksMap)) {
		list.sort((a, b) => a.slug.localeCompare(b.slug));
	}
	console.log(`  Wrote ${written} block/chart files`);
	return blocksMap;
}

function renderVars(vars: Record<string, string>, indent: string): string {
	return Object.entries(vars)
		.map(([k, v]) => `${indent}--${k}: ${v};`)
		.join("\n");
}

async function syncThemes(): Promise<void> {
	console.log("→ Fetching color themes…");
	const themes = await Promise.all(
		THEME_NAMES.map(async (name) => {
			const item = await fetchJson<RegistryItem>(
				`${REGISTRY_BASE}/theme-${name}.json`
			);
			return { name, item };
		})
	);

	const blocks: string[] = [
		"/* AUTO-GENERATED by scripts/sync-shadcn-registry.ts — do not edit. */",
		"",
	];
	for (const { name, item } of themes) {
		const light = item.cssVars?.light ?? {};
		const dark = item.cssVars?.dark ?? {};
		blocks.push(`[data-theme="${name}"] {`);
		blocks.push(renderVars(light, "\t"));
		blocks.push("}");
		blocks.push("");
		blocks.push(`.dark[data-theme="${name}"],`);
		blocks.push(`.dark [data-theme="${name}"],`);
		blocks.push(`[data-theme="${name}"].dark,`);
		blocks.push(`[data-theme="${name}"] .dark {`);
		blocks.push(renderVars(dark, "\t"));
		blocks.push("}");
		blocks.push("");
	}
	await writeFileEnsuringDir(THEMES_OUT, blocks.join("\n"));
	console.log(`  Wrote ${THEMES_OUT}`);

	// Ensure globals.css imports themes.css
	if (existsSync(GLOBALS_CSS)) {
		const current = await readFile(GLOBALS_CSS, "utf8");
		if (!current.includes('@import "./themes.css"')) {
			// Insert after the first @import line block.
			const importMarker = /(@import\s+["'][^"']+["'];?\s*\n)+/;
			const match = current.match(importMarker);
			let next: string;
			if (match) {
				const end = (match.index ?? 0) + match[0].length;
				next =
					current.slice(0, end) +
					'@import "./themes.css";\n' +
					current.slice(end);
			} else {
				next = `@import "./themes.css";\n${current}`;
			}
			await writeFile(GLOBALS_CSS, next);
			console.log(`  Patched ${GLOBALS_CSS} to import themes.css`);
		} else {
			console.log("  globals.css already imports themes.css");
		}
	}
}

function emitRegistryManifest(
	examples: Record<string, ExampleEntryOut[]>,
	blocks: Record<string, BlockEntryOut[]>
): string {
	const sortedExamples = Object.keys(examples).sort();
	const sortedBlocks = Object.keys(blocks).sort();

	const exampleEntries = sortedExamples
		.map((k) => {
			const list = examples[k] ?? [];
			const items = list
				.map(
					(e) =>
						`\t\t{ name: ${JSON.stringify(e.name)}, importPath: ${JSON.stringify(e.importPath)}, source: ${JSON.stringify(e.source)} },`
				)
				.join("\n");
			return `\t${JSON.stringify(k)}: [\n${items}\n\t],`;
		})
		.join("\n");

	const blockEntries = sortedBlocks
		.map((k) => {
			const list = blocks[k] ?? [];
			const items = list
				.map(
					(b) =>
						`\t\t{ slug: ${JSON.stringify(b.slug)}, title: ${JSON.stringify(b.title ?? "")}, importPath: ${JSON.stringify(b.importPath)}, source: ${JSON.stringify(b.source)} },`
				)
				.join("\n");
			return `\t${JSON.stringify(k)}: [\n${items}\n\t],`;
		})
		.join("\n");

	return `// AUTO-GENERATED by scripts/sync-shadcn-registry.ts — do not edit.
/* eslint-disable */
export type ExampleEntry = { name: string; source: string; importPath: string };
export type BlockEntry = { slug: string; title?: string; source: string; importPath: string };

export const examples: Record<string, ExampleEntry[]> = {
${exampleEntries}
};

export const blocks: Record<string, BlockEntry[]> = {
${blockEntries}
};
`;
}

async function main(): Promise<void> {
	const [examples, blocksMap] = await Promise.all([
		syncExamples(),
		syncBlocks(),
	]);
	await syncThemes();

	const manifest = emitRegistryManifest(examples, blocksMap);
	await writeFileEnsuringDir(REGISTRY_OUT, manifest);
	console.log(`→ Wrote registry manifest to ${REGISTRY_OUT}`);

	const exampleCount = Object.values(examples).reduce(
		(n, list) => n + list.length,
		0
	);
	const blockCount = Object.values(blocksMap).reduce(
		(n, list) => n + list.length,
		0
	);
	console.log(
		`\nDone. ${exampleCount} examples across ${Object.keys(examples).length} components, ${blockCount} blocks across ${Object.keys(blocksMap).length} categories.`
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
