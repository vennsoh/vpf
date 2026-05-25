import Link from "next/link"

import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/card"

const SECTIONS: { href: string; title: string; description: string }[] = [
	{
		href: "/components",
		title: "Components",
		description:
			"Every shadcn UI primitive — button, input, dialog, calendar, and the rest — pre-installed and browsable.",
	},
	{
		href: "/blocks",
		title: "Blocks",
		description:
			"Larger compositions: sidebars, login screens, sign-up flows, dashboards. Drop-in ready.",
	},
	{
		href: "/blocks/charts",
		title: "Charts",
		description:
			"Every chart variant from the registry, rendered with recharts and the shared theme.",
	},
	{
		href: "#",
		title: "Getting Started",
		description:
			"Conventions, theming, and how to wire @workspace/ui into a new app. (Coming soon.)",
	},
]

export default function Page() {
	return (
		<main className="mx-auto flex min-h-svh w-full max-w-5xl flex-col gap-12 px-6 py-16">
			<section className="flex flex-col gap-4">
				<h1 className="text-4xl font-semibold tracking-tight">
					VPF Design System
				</h1>
				<p className="max-w-2xl text-base text-muted-foreground">
					A personal showcase of every shadcn UI component, block, and chart —
					with global theming, dark mode, and per-component prop playgrounds.
				</p>
			</section>

			<section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{SECTIONS.map((section) => (
					<Link key={section.title} href={section.href} className="group">
						<Card className="h-full transition-colors group-hover:bg-muted/30">
							<CardHeader>
								<CardTitle className="text-lg">{section.title}</CardTitle>
								<CardDescription>{section.description}</CardDescription>
							</CardHeader>
						</Card>
					</Link>
				))}
			</section>

			<p className="font-mono text-xs text-muted-foreground">
				Press <kbd className="rounded bg-muted px-1 py-0.5">d</kbd> to toggle
				dark mode.
			</p>
		</main>
	)
}
