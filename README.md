# vpf — design system + portfolio monorepo

Turborepo + pnpm workspace. Built on the shadcn/ui monorepo template.

## Workspaces

| Path | Purpose |
| --- | --- |
| `packages/ui` | Shared UI library (`@vpf/ui`). All 55 shadcn primitives live here. |
| `packages/eslint-config`, `packages/typescript-config` | Shared lint + TS configs. |
| `apps/docs` | Design-system showcase site on port 3001. Renders every component, registry example, and block with theme + prop playgrounds. |
| `apps/web` | Reserved for the portfolio. Runs on port 3000. |

## Common commands

```bash
pnpm install                 # install everything
pnpm dev                     # boots apps/web only (port 3000)
pnpm dev:docs                # boots apps/docs only (port 3001)
pnpm dev:all                 # boots everything in parallel
pnpm --filter docs dev       # same as dev:docs, explicit filter form
pnpm --filter web dev        # same as dev, explicit filter form
pnpm --filter docs build     # production build of the docs site
pnpm typecheck               # tsc across all packages
pnpm lint                    # eslint across all packages
pnpm sync:registry           # re-pull shadcn examples + blocks + themes
```

## Adding shadcn components

To add a single component to `packages/ui`:

```bash
pnpm dlx shadcn@latest add <component> -c packages/ui
```

To add all of them at once:

```bash
pnpm dlx shadcn@latest add --all -c packages/ui
```

Import into any app:

```tsx
import { Button } from "@vpf/ui/components/button";
```

## Syncing shadcn examples and blocks

The docs site renders every shadcn example variant and every block. Examples and blocks aren't installed via the `shadcn` CLI (the `base-nova` style we use doesn't expose them) — they're fetched and import-rewritten by `scripts/sync-shadcn-registry.ts`.

```bash
pnpm sync:registry
```

The script writes:

- `apps/docs/components/examples/<component>/<example>.tsx` — example sources, plus any relative sibling files (e.g. server actions, schemas) fetched from `raw.githubusercontent.com`.
- `apps/docs/components/blocks/<category>/<slug>/...` — blocks grouped into `sidebar`, `login`, `signup`, `dashboard`, `charts`.
- `packages/ui/src/styles/themes.css` — color presets (stone, zinc, neutral, gray, slate) bound to `[data-theme="<preset>"]`.
- `apps/docs/lib/registry.generated.ts` — typed manifest consumed by the docs site.

The script falls back to scanning the local synced directories if the unauthenticated GitHub Contents API rate-limits the listing (the `ui.shadcn.com` payload endpoint and `raw.githubusercontent.com` siblings are not rate-limited).

Re-run any time shadcn ships new items.

## How dependencies are organized

Workspace packages declare their own runtime deps in their own `package.json` — this is intentional and correct for pnpm. `apps/docs` redeclares libraries like `recharts`, `sonner`, `react-hook-form`, etc. that the synced shadcn examples import directly at the app level, even though `packages/ui` also declares them. pnpm doesn't hoist transitive deps across workspaces by default, so each app needs to list what it imports.

If you add a new library inside an app, declare it in that app's `package.json`. If you add it to `packages/ui`, it's available to consumers of `@vpf/ui` automatically — but apps that also reach into the library through their own imports will need to declare it too.

## Production build typecheck

`apps/docs/tsconfig.json` excludes `components/examples/**` and `components/blocks/**` from typecheck. The synced shadcn examples assume Radix-style APIs (`asChild`, `<ToggleGroup type="single">`) but our `packages/ui` is built on Base-UI (the `base-nova` style), so the patterns don't always match. The examples still render correctly at runtime — Base-UI ignores unknown props rather than rejecting them — but TypeScript flags the mismatch. They're vendor reference material, not first-party code. Lift them into actual app code with the appropriate Base-UI rewrites when you build features against them.
