import { BlockLoader } from "@/components/block-loader"
import { blocks } from "@/lib/registry"

type RouteParams = { category: string; slug: string }

export default async function BlockPreviewPage({
	params,
}: {
	params: Promise<RouteParams>
}) {
	const { category, slug } = await params

	const entries = blocks[category] ?? []
	const entry = entries.find((b) => b.slug === slug)

	if (!entry) {
		return (
			<div className="flex min-h-svh items-center justify-center bg-background text-sm text-muted-foreground">
				block not found
			</div>
		)
	}

	return (
		<div className="min-h-svh bg-background">
			<BlockLoader importPath={entry.importPath} />
		</div>
	)
}
