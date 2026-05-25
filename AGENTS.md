# AGENTS.md

This file is the canonical, agent-neutral guide for AI coding agents (Claude Code, Codex, Cursor, Gemini, etc.) working in this repository. It follows the [agents.md](https://agents.md) open standard.

`CLAUDE.md` is a symlink to this file. Agent-specific configuration (Claude skills, hooks, settings) lives in `.agents/`, and `.claude/` is a symlink to that directory. Edit `AGENTS.md` and `.agents/` — never the symlinks.

## Repo layout

Turborepo + pnpm monorepo.

- `apps/web` — personal portfolio site (Next.js 16, port 3000)
- `apps/docs` — design system showcase (Next.js 16, port 3001)
- `packages/ui` — shared `@workspace/ui` library (shadcn primitives on top of **Base-UI**, not Radix)
- `packages/eslint-config`, `packages/typescript-config` — shared configs

## Commands

- `pnpm dev` — boots `apps/web` only (via `scripts/dev.mjs`, reads `.env.local`)
- `pnpm dev:docs` — boots `apps/docs` only
- `pnpm lint` / `pnpm typecheck` / `pnpm format` / `pnpm build` — Turbo-orchestrated across the workspace
- `pnpm sync:registry` — **do not run automatically.** Regenerates `apps/docs/components/examples/**`, `apps/docs/components/blocks/**`, `packages/ui/src/styles/themes.css`, and `apps/docs/lib/registry.generated.ts` from upstream shadcn. Run only when explicitly asked.

There is no CI — `pnpm lint && pnpm typecheck` is the gate before committing.

## Conventions

- **Base-UI, not Radix.** Do not add `@radix-ui/*` dependencies. The UI library wraps Base-UI primitives.
- **Reusable components live in `packages/ui`**, consumed as `@workspace/ui/components/<name>`. Do not add primitives directly inside `apps/*`.
- TS errors inside `apps/docs/components/examples/**` and `apps/docs/components/blocks/**` are expected — these are vendored from shadcn and assume Radix prop shapes. They are excluded from `apps/docs`'s typecheck and Base-UI ignores unknown props at runtime. **Don't hand-edit them, and don't try to "fix" their types** — they will be overwritten by `pnpm sync:registry`.
- Prettier: LF, no semicolons, double quotes, 2-space tabs, trailing comma `es5`, print width 80. `prettier-plugin-tailwindcss` sorts Tailwind classes (including inside `cn()` and `cva()`).

## Dev env

- `scripts/dev.mjs` reads `.env.local` and injects vars into `process.env`. App selection via `PORTLESS_APP` or `PORT`.
- `portless.json` maps `apps/web` → `web` and `apps/docs` → `docs` for local named URLs.

## Agent configuration

Provider-specific configuration is consolidated under `.agents/` so each tool can find what it needs without duplicating files:

- `.agents/settings.json` — Claude Code hooks and settings (read by Claude via the `.claude/` symlink).
- `.agents/skills/` — Claude Code skills, including `/check` (runs `pnpm lint && pnpm typecheck`).
- `.agents/settings.local.json` — personal, gitignored overrides.

Other agents (Codex, Cursor, Gemini, etc.) read `AGENTS.md` directly. If a new provider needs its own dotfolder, symlink it from `.agents/` the same way `.claude/` is.
