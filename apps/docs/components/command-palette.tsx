"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@workspace/ui/components/button"
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@workspace/ui/components/command"

import {
	COMPONENT_SLUGS,
	blocks,
	examples,
	getComponentMeta,
} from "@/lib/registry"

type SearchEntry = {
	kind: "component" | "block"
	group: string
	slug: string
	title: string
	href: string
}

function buildEntries(): SearchEntry[] {
	const list: SearchEntry[] = []

	const componentSlugs = Object.keys(examples)
	for (const slug of componentSlugs) {
		// Only include slugs that we recognize as canonical components.
		if (!(COMPONENT_SLUGS as readonly string[]).includes(slug)) continue
		const meta = getComponentMeta(slug)
		list.push({
			kind: "component",
			group: "Components",
			slug,
			title: meta.title,
			href: `/components/${slug}`,
		})
	}

	for (const [category, entries] of Object.entries(blocks)) {
		for (const entry of entries) {
			const label = entry.title?.trim()
				? `${category}/${entry.slug} — ${entry.title}`
				: `${category}/${entry.slug}`
			list.push({
				kind: "block",
				group: "Blocks",
				slug: entry.slug,
				title: label,
				href: `/blocks/${category}/${entry.slug}`,
			})
		}
	}

	return list
}

export function CommandPalette() {
	const router = useRouter()
	const [open, setOpen] = React.useState(false)

	const entries = React.useMemo(() => buildEntries(), [])
	const components = React.useMemo(
		() => entries.filter((e) => e.kind === "component"),
		[entries]
	)
	const blockEntries = React.useMemo(
		() => entries.filter((e) => e.kind === "block"),
		[entries]
	)

	React.useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			if (event.key !== "k" || !(event.metaKey || event.ctrlKey)) return

			const target = event.target as HTMLElement | null
			if (target) {
				const tag = target.tagName
				const isEditable =
					tag === "INPUT" ||
					tag === "TEXTAREA" ||
					tag === "SELECT" ||
					target.isContentEditable
				// Allow ⌘K to toggle even when focus is in an input — but only if
				// the input isn't actively being typed into for autocomplete.
				// Here we follow the simple rule from the spec: don't fire while
				// typing in inputs, *unless* the dialog is already open.
				if (isEditable && !open) return
			}

			event.preventDefault()
			setOpen((prev) => !prev)
		}

		window.addEventListener("keydown", onKeyDown)
		return () => {
			window.removeEventListener("keydown", onKeyDown)
		}
	}, [open])

	const navigate = React.useCallback(
		(href: string) => {
			setOpen(false)
			router.push(href)
		},
		[router]
	)

	return (
		<>
			<Button
				variant="outline"
				onClick={() => setOpen(true)}
				className="relative h-9 w-full justify-start rounded-md text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
			>
				<span>Search…</span>
				<kbd className="pointer-events-none absolute top-1/2 right-1.5 hidden h-5 -translate-y-1/2 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex">
					<span className="text-xs">⌘</span>K
				</kbd>
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Search components, blocks…" />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					{components.length > 0 ? (
						<CommandGroup heading="Components">
							{components.map((entry) => (
								<CommandItem
									key={`component:${entry.slug}`}
									value={`component ${entry.title} ${entry.slug}`}
									onSelect={() => navigate(entry.href)}
								>
									{entry.title}
								</CommandItem>
							))}
						</CommandGroup>
					) : null}
					{blockEntries.length > 0 ? (
						<CommandGroup heading="Blocks">
							{blockEntries.map((entry) => (
								<CommandItem
									key={`block:${entry.href}`}
									value={`block ${entry.title}`}
									onSelect={() => navigate(entry.href)}
								>
									{entry.title}
								</CommandItem>
							))}
						</CommandGroup>
					) : null}
				</CommandList>
			</CommandDialog>
		</>
	)
}
