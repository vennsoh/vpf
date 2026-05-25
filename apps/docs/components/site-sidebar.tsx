"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@workspace/ui/lib/utils"

import { examples, blocks } from "@/lib/registry"

const FALLBACK_COMPONENTS = [
	"accordion",
	"alert",
	"alert-dialog",
	"aspect-ratio",
	"avatar",
	"badge",
	"breadcrumb",
	"button",
	"button-group",
	"calendar",
	"card",
	"carousel",
	"chart",
	"checkbox",
	"collapsible",
	"combobox",
	"command",
	"context-menu",
	"dialog",
	"drawer",
	"dropdown-menu",
	"empty",
	"field",
	"form",
	"hover-card",
	"input",
	"input-group",
	"input-otp",
	"item",
	"kbd",
	"label",
	"menubar",
	"native-select",
	"navigation-menu",
	"pagination",
	"popover",
	"progress",
	"radio-group",
	"resizable",
	"scroll-area",
	"select",
	"separator",
	"sheet",
	"sidebar",
	"skeleton",
	"slider",
	"sonner",
	"spinner",
	"switch",
	"table",
	"tabs",
	"textarea",
	"toggle",
	"toggle-group",
	"tooltip",
]

const BLOCK_CATEGORIES = ["sidebar", "login", "signup", "dashboard", "charts"]

function getComponentSlugs(): string[] {
	const keys = Object.keys(examples)
	if (keys.length > 0) {
		return keys.slice().sort()
	}
	return FALLBACK_COMPONENTS.slice().sort()
}

function getBlocksByCategory(): Record<string, { slug: string; title: string }[]> {
	const out: Record<string, { slug: string; title: string }[]> = {}
	const hasBlocks = Object.keys(blocks).length > 0
	if (hasBlocks) {
		for (const [category, entries] of Object.entries(blocks)) {
			out[category] = entries.map((entry) => ({
				slug: entry.slug,
				title: entry.title?.trim() || entry.slug,
			}))
		}
	} else {
		for (const cat of BLOCK_CATEGORIES) {
			out[cat] = []
		}
	}
	return out
}

function NavLink({ href, label }: { href: string; label: string }) {
	const pathname = usePathname()
	const active = pathname === href
	return (
		<Link
			href={href}
			className={cn(
				"block rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
				active && "bg-muted font-medium text-foreground"
			)}
		>
			{label}
		</Link>
	)
}

function SidebarSection({
	title,
	children,
}: {
	title: string
	children: React.ReactNode
}) {
	return (
		<div className="flex flex-col gap-1">
			<div className="px-2 py-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
				{title}
			</div>
			<div className="flex flex-col gap-0.5">{children}</div>
		</div>
	)
}

export function SiteSidebar() {
	const componentSlugs = getComponentSlugs()
	const blocksByCategory = getBlocksByCategory()

	return (
		<aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-[250px] shrink-0 overflow-y-auto border-r px-3 py-6 md:block">
			<nav className="flex flex-col gap-6">
				<SidebarSection title="Getting Started">
					<NavLink href="/" label="Introduction" />
				</SidebarSection>

				<SidebarSection title="Components">
					{componentSlugs.map((slug) => (
						<NavLink
							key={slug}
							href={`/components/${slug}`}
							label={slug
								.split("-")
								.map((p) => p.charAt(0).toUpperCase() + p.slice(1))
								.join(" ")}
						/>
					))}
				</SidebarSection>

				<SidebarSection title="Blocks">
					{Object.entries(blocksByCategory).map(([category, entries]) => (
						<div key={category} className="flex flex-col gap-0.5">
							<div className="px-2 pt-2 pb-1 text-[11px] font-medium text-muted-foreground capitalize">
								{category}
							</div>
							{entries.length === 0 ? (
								<div className="px-2 py-1 text-xs text-muted-foreground italic">
									None yet
								</div>
							) : (
								entries.map((entry) => (
									<NavLink
										key={entry.slug}
										href={`/blocks/${category}/${entry.slug}`}
										label={entry.title}
									/>
								))
							)}
						</div>
					))}
				</SidebarSection>
			</nav>
		</aside>
	)
}
