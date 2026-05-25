"use client"

import * as React from "react"
import dynamic from "next/dynamic"

type Props = {
	importPath: string
}

/**
 * Client-side dynamic loader for synced block components.
 *
 * Same rationale as `ExampleLoader`: `next/dynamic` with `ssr: false` is
 * only legal inside Client Components in Next.js 16. The template literal is
 * scoped to the `@/components/blocks/` subtree so the eager compile only
 * walks blocks.
 */
export function BlockLoader({ importPath }: Props) {
	const Component = React.useMemo(() => {
		const blockPath = importPath.replace(/^@\/components\/blocks\//, "")
		return dynamic(
			() =>
				import(`@/components/blocks/${blockPath}`).then((mod) => ({
					default: (mod.default ?? mod) as React.ComponentType,
				})),
			{ ssr: false, loading: () => null }
		)
	}, [importPath])

	return <Component />
}
