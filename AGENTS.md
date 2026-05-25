# AGENTS.md

This file is the canonical, agent-neutral guide for AI coding agents (Claude Code, Codex, Cursor, etc.) working in this repository. It follows the [agents.md](https://agents.md) open standard.

`CLAUDE.md` is a symlink to this file. Agent-specific configuration (Claude skills, hooks, settings) lives in `.agents/`, and `.claude/` is a symlink to that directory. Edit `AGENTS.md` and `.agents/` — never the symlinks.

## Repo layout

Turborepo + pnpm monorepo.

- `apps/web` — personal portfolio site (Next.js 16, port 3000)
- `apps/docs` — design system showcase (Next.js 16, port 3001)
- `packages/ui` — shared `@vpf/ui` library (shadcn primitives on top of **Base-UI**, not Radix)
- `packages/eslint-config`, `packages/typescript-config` — shared configs

## Commands

- `pnpm dev` — boots `apps/web` only (via `scripts/dev.mjs`, reads `.env.local`)
- `pnpm dev:docs` — boots `apps/docs` only
- `pnpm lint` / `pnpm typecheck` / `pnpm format` / `pnpm build` — Turbo-orchestrated across the workspace
- `pnpm sync:registry` — **do not run automatically.** Regenerates `apps/docs/components/examples/**`, `apps/docs/components/blocks/**`, `packages/ui/src/styles/themes.css`, and `apps/docs/lib/registry.generated.ts` from upstream shadcn. Run only when explicitly asked.

There is no CI — `pnpm lint && pnpm typecheck` is the gate before committing.

## Conventions

- **Base-UI, not Radix.** Do not add `@radix-ui/*` dependencies. The UI library wraps Base-UI primitives.
- **Reusable components live in `packages/ui`**, consumed as `@vpf/ui/components/<name>`. Do not add primitives directly inside `apps/*`.
- TS errors inside `apps/docs/components/examples/**` and `apps/docs/components/blocks/**` are expected — these are vendored from shadcn and assume Radix prop shapes. They are excluded from `apps/docs`'s typecheck and Base-UI ignores unknown props at runtime. **Don't hand-edit them, and don't try to "fix" their types** — they will be overwritten by `pnpm sync:registry`.
- Prettier: LF, no semicolons, double quotes, 2-space tabs, trailing comma `es5`, print width 80. `prettier-plugin-tailwindcss` sorts Tailwind classes (including inside `cn()` and `cva()`).

## Dev env

- `scripts/dev.mjs` reads `.env.local` and injects vars into `process.env`. App selection via `PORTLESS_APP` or `PORT`.
- `portless.json` maps `apps/web` → `web` and `apps/docs` → `docs` for local named URLs.

## Component selection (react-grab)

Both `apps/web` and `apps/docs` load [`react-grab`](https://github.com/aidenybai/react-grab) from unpkg in dev only (see each app's `app/layout.tsx`). It is **not a runtime dependency** — the `<Script>` tag is gated on `process.env.NODE_ENV === "development"` so it's stripped from production builds.

Usage (humans): hover any element in the running dev app, press **⌘C** (macOS) or **Ctrl+C**, paste into your AI agent. The clipboard payload includes the element, source file/line, surrounding code, and component stack — enough for an agent to locate and edit the source.

If you need to upgrade or pin react-grab, change the `src` URL in both layouts; do not install it as a workspace dependency.

## Browser automation testing (agent-browser)

Use [`agent-browser`](https://github.com/vercel-labs/agent-browser) for end-to-end and visual checks against the running dev apps. It is a per-user global CLI, **not a project dependency** — agents should assume it's installed at `agent-browser` on PATH. If missing:

```bash
npm i -g agent-browser && agent-browser install
```

Standard loop against this repo:

```bash
pnpm dev                                    # or pnpm dev:docs (port 3001)
agent-browser open http://localhost:3000    # or the portless URL
agent-browser snapshot -i                   # see interactive elements (@e1, @e2, ...)
agent-browser click @e3                     # act on a ref
agent-browser snapshot -i                   # re-snapshot after any state change
agent-browser screenshot out.png            # capture for review
agent-browser close
```

Refs (`@eN`) are reassigned on every snapshot — always re-snapshot after a click/navigation. For full command reference run `agent-browser skills get core --full`.

Combine with react-grab when an agent needs to find the source for a UI element it just interacted with: take the screenshot, then ask a human to ⌘C-paste the grab payload, or use `agent-browser get attr @eN data-source` if a grab/source attribute is present.

## Agent configuration

Provider-specific configuration is consolidated under `.agents/` so each tool can find what it needs without duplicating files:

- `.agents/settings.json` — Claude Code hooks and settings (read by Claude via the `.claude/` symlink).
- `.agents/skills/` — Claude Code skills, including `/check` (runs `pnpm lint && pnpm typecheck`).
- `.agents/settings.local.json` — personal, gitignored overrides.

Other agents (Codex, Cursor, Gemini, etc.) read `AGENTS.md` directly. If a new provider needs its own dotfolder, symlink it from `.agents/` the same way `.claude/` is.
