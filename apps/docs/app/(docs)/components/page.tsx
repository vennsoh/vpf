import Link from "next/link"
import type { Metadata } from "next"

import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@vpf/ui/components/card"

import {
	COMPONENT_SLUGS,
	examples,
	getComponentMeta,
} from "@/lib/registry"

export const metadata: Metadata = {
	title: "Components",
	description: "Every shadcn UI primitive in the registry.",
}

export default function ComponentsIndexPage() {
	const slugs = [...COMPONENT_SLUGS].sort()

	return (
		<div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
			<header className="flex flex-col gap-2">
				<h1 className="text-3xl font-semibold tracking-tight">Components</h1>
				<p className="max-w-2xl text-sm text-muted-foreground">
					Every shadcn UI primitive in the registry. Click a card to see its
					examples, props, and source code.
				</p>
			</header>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{slugs.map((slug) => {
					const meta = getComponentMeta(slug)
					const count = examples[slug]?.length ?? 0
					return (
						<Link
							key={slug}
							href={`/components/${slug}`}
							className="group rounded-lg border bg-card transition-colors hover:bg-muted/50"
						>
							<Card className="h-full border-0 bg-transparent shadow-none ring-0">
								<CardHeader>
									<CardTitle className="text-base">{meta.title}</CardTitle>
									<CardDescription className="line-clamp-2">
										{meta.description ||
											"View examples, props, and source code."}
									</CardDescription>
									<div className="pt-2 text-xs text-muted-foreground">
										{count} example{count === 1 ? "" : "s"}
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
