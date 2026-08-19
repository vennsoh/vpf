import { BlockLoader } from "@/components/block-loader"
import { blocks } from "@/lib/registry"
import { cn } from "@vpf/ui/lib/utils"

type RouteParams = { category: string; slug: string }

const FULL_WIDTH_CHARTS = new Set([
	"chart-area-interactive",
	"chart-bar-interactive",
	"chart-line-interactive",
])

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

	const constrainChart =
		category === "charts" && !FULL_WIDTH_CHARTS.has(entry.slug)

	return (
		<div
			className={cn(
				"min-h-svh bg-background",
				constrainChart &&
					"flex items-center justify-center p-6 [&>*]:w-full [&>*]:max-w-md"
			)}
		>
			<BlockLoader importPath={entry.importPath} />
		</div>
	)
}
