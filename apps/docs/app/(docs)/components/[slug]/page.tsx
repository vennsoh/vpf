import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ComponentPreview } from "@/components/component-preview"
import { ExampleLoader } from "@/components/example-loader"
import { PLAYGROUNDS } from "@/components/playgrounds"
import {
	COMPONENT_SLUGS,
	examples,
	getComponentMeta,
} from "@/lib/registry"

export function generateStaticParams() {
	return COMPONENT_SLUGS.map((slug) => ({ slug }))
}

type Params = { slug: string }

export async function generateMetadata({
	params,
}: {
	params: Promise<Params>
}): Promise<Metadata> {
	const { slug } = await params
	const meta = getComponentMeta(slug)
	return {
		title: meta.title,
		description: meta.description,
	}
}

export default async function ComponentPage({
	params,
}: {
	params: Promise<Params>
}) {
	const { slug } = await params

	if (!COMPONENT_SLUGS.includes(slug as (typeof COMPONENT_SLUGS)[number])) {
		notFound()
	}

	const meta = getComponentMeta(slug)
	const entries = examples[slug] ?? []
	const Playground = PLAYGROUNDS[slug]

	return (
		<div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
			<header className="flex flex-col gap-2">
				<h1 className="text-3xl font-semibold tracking-tight">{meta.title}</h1>
				{meta.description ? (
					<p className="max-w-2xl text-sm text-muted-foreground">
						{meta.description}
					</p>
				) : null}
			</header>

			{Playground ? (
				<section className="flex flex-col gap-3">
					<h2 className="text-lg font-medium">Playground</h2>
					<Playground />
				</section>
			) : null}

			{entries.length > 0 ? (
				<section className="flex flex-col gap-6">
					<h2 className="text-lg font-medium">Examples</h2>
					{entries.map((entry) => (
						<div key={entry.name} className="flex flex-col gap-2">
							<h3 className="font-mono text-sm text-muted-foreground">
								{entry.name}
							</h3>
							<ComponentPreview name={entry.name} source={entry.source}>
								<ExampleLoader importPath={entry.importPath} />
							</ComponentPreview>
						</div>
					))}
				</section>
			) : (
				<section className="rounded-md border border-dashed p-6 text-sm text-muted-foreground">
					No examples have been synced for{" "}
					<span className="font-mono">{slug}</span> yet.
				</section>
			)}
		</div>
	)
}
