import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/card"

import { blocks } from "@/lib/registry"

export function generateStaticParams() {
	return Object.keys(blocks).map((category) => ({ category }))
}

type Params = { category: string }

export async function generateMetadata({
	params,
}: {
	params: Promise<Params>
}): Promise<Metadata> {
	const { category } = await params
	return {
		title: `${category.charAt(0).toUpperCase()}${category.slice(1)} blocks`,
	}
}

function titleFor(slug: string, title?: string): string {
	if (title && title.trim().length > 0) return title
	return slug
		.split("-")
		.map((p) => p.charAt(0).toUpperCase() + p.slice(1))
		.join(" ")
}

export default async function BlockCategoryPage({
	params,
}: {
	params: Promise<Params>
}) {
	const { category } = await params
	const entries = blocks[category]

	if (!entries) {
		notFound()
	}

	return (
		<div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
			<header className="flex flex-col gap-2">
				<h1 className="text-3xl font-semibold tracking-tight capitalize">
					{category}
				</h1>
				<p className="max-w-2xl text-sm text-muted-foreground">
					{entries.length} block{entries.length === 1 ? "" : "s"} in this
					category.
				</p>
			</header>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{entries.map((entry) => (
					<Link
						key={entry.slug}
						href={`/blocks/${category}/${entry.slug}`}
						className="group rounded-lg border bg-card transition-colors hover:bg-muted/50"
					>
						<Card className="h-full border-0 bg-transparent shadow-none">
							<CardHeader>
								<CardTitle className="text-sm">
									{titleFor(entry.slug, entry.title)}
								</CardTitle>
								<CardDescription className="font-mono text-xs">
									{entry.slug}
								</CardDescription>
							</CardHeader>
						</Card>
					</Link>
				))}
			</div>
		</div>
	)
}
