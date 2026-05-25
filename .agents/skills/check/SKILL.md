---
name: check
description: Run lint and typecheck across the workspace to verify changes before commit. Use after non-trivial edits, or when the user asks to "check", "verify", or confirm the workspace is clean.
---

Run the workspace-wide gate that stands in for CI:

```bash
pnpm lint && pnpm typecheck
```

Both run through Turbo and cover every workspace package.

**Expected non-issues** (do not report as failures):

- TS errors inside `apps/docs/components/examples/**` or `apps/docs/components/blocks/**` — these are vendored shadcn files assuming Radix prop shapes. `apps/docs/tsconfig.json` already excludes them. If they show up in output anyway, treat as pre-existing.

**On failure**: report the failing package and the first ~20 lines of relevant output. Do not auto-fix without confirming the intended fix with the user — lint/type errors can mask real bugs.

**On success**: report a one-line "lint + typecheck clean" so the user knows it's safe to commit.
