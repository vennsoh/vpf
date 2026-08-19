import Link from "next/link"
import type { Metadata } from "next"

import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@vpf/ui/components/card"

import { blocks } from "@/lib/registry"

export const metadata: Metadata = {
	title: "Blocks",
	description: "Larger compositions: sidebars, dashboards, login flows, and charts.",
}

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
	charts: "Every chart variant from the registry, rendered with Recharts.",
	dashboard: "Full-page dashboard layouts with cards, charts, and tables.",
	login: "Authentication screens with multiple layouts.",
	sidebar: "Sidebar navigation patterns of varying complexity.",
	signup: "Sign-up screens and onboarding flows.",
}

const CATEGORY_ORDER = ["sidebar", "dashboard", "login", "signup", "charts"]

function titleCase(slug: string): string {
	return slug.charAt(0).toUpperCase() + slug.slice(1)
}

export default function BlocksIndexPage() {
	const categories = Object.keys(blocks).sort((a, b) => {
		const ai = CATEGORY_ORDER.indexOf(a)
		const bi = CATEGORY_ORDER.indexOf(b)
		if (ai === -1 && bi === -1) return a.localeCompare(b)
		if (ai === -1) return 1
		if (bi === -1) return -1
		return ai - bi
	})

	return (
		<div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
			<header className="flex flex-col gap-2">
				<h1 className="text-3xl font-semibold tracking-tight">Blocks</h1>
				<p className="max-w-2xl text-sm text-muted-foreground">
					Larger compositions built from the primitives. Pick a category to
					browse its blocks.
				</p>
			</header>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{categories.map((category) => {
					const count = blocks[category]?.length ?? 0
					return (
						<Link
							key={category}
							href={`/blocks/${category}`}
							className="group rounded-lg border bg-card transition-colors hover:bg-muted/50"
						>
							<Card className="h-full border-0 bg-transparent shadow-none ring-0">
								<CardHeader>
									<CardTitle className="text-base">
										{titleCase(category)}
									</CardTitle>
									<CardDescription className="line-clamp-2">
										{CATEGORY_DESCRIPTIONS[category] ??
											`Browse ${category} blocks.`}
									</CardDescription>
									<div className="pt-2 text-xs text-muted-foreground">
										{count} block{count === 1 ? "" : "s"}
									</div>
								</CardHeader>
							</Card>
						</Link>
					)
				})}
			</div>
		</div>
	)
}
