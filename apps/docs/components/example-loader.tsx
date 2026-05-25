"use client"

import * as React from "react"
import dynamic from "next/dynamic"

type Props = {
	importPath: string
}

/**
 * Client-side dynamic loader for synced example components.
 *
 * `next/dynamic` with `ssr: false` is only legal inside Client Components in
 * Next.js 16, so this small wrapper exists to be rendered from the server
 * component at `app/(docs)/components/[slug]/page.tsx`.
 *
 * The template-literal import is intentional: Turbopack / webpack will
 * statically expand it to every module reachable from the prefix directory,
 * which is exactly the set of synced example files we want to make loadable
 * by path at runtime.
 */
export function ExampleLoader({ importPath }: Props) {
	const Component = React.useMemo(() => {
		// Strip the `@/components/examples/` prefix so the template-literal import
		// is scoped tightly to the examples directory. Anything not under that
		// prefix is ignored — `next/dynamic` will render `null` for an unknown id.
		const examplePath = importPath.replace(/^@\/components\/examples\//, "")
		return dynamic(
			() =>
				import(`@/components/examples/${examplePath}`).then((mod) => ({
					default: (mod.default ?? mod) as React.ComponentType,
				})),
			{ ssr: false, loading: () => null }
		)
	}, [importPath])

	return <Component />
}
