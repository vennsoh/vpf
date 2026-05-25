import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BlockPreviewer } from "@/components/block-previewer"
import { blocks } from "@/lib/registry"

export function generateStaticParams() {
	const params: { category: string; slug: string }[] = []
	for (const [category, entries] of Object.entries(blocks)) {
		for (const entry of entries) {
			params.push({ category, slug: entry.slug })
		}
	}
	return params
}

type Params = { category: string; slug: string }

export async function generateMetadata({
	params,
}: {
	params: Promise<Params>
}): Promise<Metadata> {
	const { category, slug } = await params
	return { title: `${slug} — ${category}` }
}

function titleFor(slug: string, title?: string): string {
	if (title && title.trim().length > 0) return title
	return slug
		.split("-")
		.map((p) => p.charAt(0).toUpperCase() + p.slice(1))
		.join(" ")
}

export default async function BlockDetailPage({
	params,
}: {
	params: Promise<Params>
}) {
	const { category, slug } = await params
	const entry = blocks[category]?.find((b) => b.slug === slug)

	if (!entry) {
		notFound()
	}

	const title = titleFor(entry.slug, entry.title)
	const previewSrc = `/preview/blocks/${category}/${entry.slug}`

	return (
		<div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
			<header className="flex flex-col gap-2">
				<div className="font-mono text-xs text-muted-foreground capitalize">
					{category} / {entry.slug}
				</div>
				<h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
			</header>
			<BlockPreviewer src={previewSrc} title={title} />
		</div>
	)
}
