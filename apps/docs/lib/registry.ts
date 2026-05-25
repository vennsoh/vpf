import {
	examples as rawExamples,
	blocks as rawBlocks,
	type ExampleEntry,
	type BlockEntry,
} from "./registry.generated"

export type { ExampleEntry, BlockEntry } from "./registry.generated"

/**
 * Canonical component slugs (the actual file names in packages/ui/src/components).
 * The sync script buckets examples by the FIRST hyphen segment, which collapses
 * multi-word components (alert-dialog -> "alert", aspect-ratio -> "aspect", etc.)
 * We re-bucket below by longest-prefix match against this list.
 */
export const COMPONENT_SLUGS = [
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
] as const

export type ComponentSlug = (typeof COMPONENT_SLUGS)[number]

// Sort once, longest first, to make the prefix match easy.
const SLUGS_BY_LENGTH = [...COMPONENT_SLUGS].sort((a, b) => b.length - a.length)

function matchSlug(name: string): string | null {
	for (const slug of SLUGS_BY_LENGTH) {
		if (name === slug || name.startsWith(slug + "-")) return slug
	}
	return null
}

function rebucketExamples(
	raw: Record<string, ExampleEntry[]>
): Record<string, ExampleEntry[]> {
	const out: Record<string, ExampleEntry[]> = {}
	for (const list of Object.values(raw)) {
		for (const entry of list) {
			const slug = matchSlug(entry.name)
			if (!slug) continue
			if (!out[slug]) out[slug] = []
			out[slug].push(entry)
		}
	}
	// Sort each bucket alphabetically by name so demo entries appear first reliably.
	for (const key of Object.keys(out)) {
		out[key]!.sort((a, b) => a.name.localeCompare(b.name))
	}
	return out
}

export const examples: Record<string, ExampleEntry[]> = rebucketExamples(rawExamples)
export const blocks: Record<string, BlockEntry[]> = rawBlocks

export type ComponentMeta = {
	title: string
	description: string
}

function titleCase(slug: string): string {
	return slug
		.split("-")
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ")
}

// Short descriptions for each component, kept ≤80 chars. Title-case fallback otherwise.
const COMPONENT_META: Record<string, ComponentMeta> = {
	accordion: {
		title: "Accordion",
		description: "Vertically stacked panels that expand to reveal content.",
	},
	alert: {
		title: "Alert",
		description: "Callout for user attention with optional title and description.",
	},
	"alert-dialog": {
		title: "Alert Dialog",
		description: "Modal dialog that interrupts the user with important content.",
	},
	"aspect-ratio": {
		title: "Aspect Ratio",
		description: "Displays content within a desired ratio.",
	},
	avatar: {
		title: "Avatar",
		description: "Image element with a fallback for representing a user.",
	},
	badge: {
		title: "Badge",
		description: "Small label for counts, statuses, or tags.",
	},
	breadcrumb: {
		title: "Breadcrumb",
		description: "Hierarchy of links to the current resource.",
	},
	button: {
		title: "Button",
		description: "Triggers an action or event.",
	},
	"button-group": {
		title: "Button Group",
		description: "Group related actions into a single visual unit.",
	},
	calendar: {
		title: "Calendar",
		description: "Date field component for selecting dates or ranges.",
	},
	card: {
		title: "Card",
		description: "Container for related content and actions.",
	},
	carousel: {
		title: "Carousel",
		description: "Slideshow component for cycling through elements.",
	},
	chart: {
		title: "Chart",
		description: "Beautiful charts built on top of Recharts.",
	},
	checkbox: {
		title: "Checkbox",
		description: "Control that allows the user to toggle between on and off.",
	},
	collapsible: {
		title: "Collapsible",
		description: "Interactive component that expands and collapses content.",
	},
	combobox: {
		title: "Combobox",
		description: "Autocomplete input and command palette pattern.",
	},
	command: {
		title: "Command",
		description: "Fast, composable, unstyled command menu for React.",
	},
	"context-menu": {
		title: "Context Menu",
		description: "Menu shown by right-clicking or focusing an element.",
	},
	dialog: {
		title: "Dialog",
		description: "Window overlaid on the primary window or another dialog.",
	},
	drawer: {
		title: "Drawer",
		description: "Sheet-style drawer that slides up from the bottom.",
	},
	"dropdown-menu": {
		title: "Dropdown Menu",
		description: "Menu displayed when triggering a button.",
	},
	empty: {
		title: "Empty",
		description: "Placeholder shown when no data is available.",
	},
	field: {
		title: "Field",
		description: "Form field wrapper with label, control, and description.",
	},
	form: {
		title: "Form",
		description: "Build forms with react-hook-form and Zod validation.",
	},
	"hover-card": {
		title: "Hover Card",
		description: "Preview information when the user hovers over an element.",
	},
	input: {
		title: "Input",
		description: "Form input field that accepts user text.",
	},
	"input-group": {
		title: "Input Group",
		description: "Compose inputs with icons, buttons, and addons.",
	},
	"input-otp": {
		title: "Input OTP",
		description: "Accessible one-time password component with copy-paste.",
	},
	item: {
		title: "Item",
		description: "Composable list item primitive for cards and menus.",
	},
	kbd: {
		title: "Kbd",
		description: "Visual representation of a keyboard input.",
	},
	label: {
		title: "Label",
		description: "Accessible label associated with form controls.",
	},
	menubar: {
		title: "Menubar",
		description: "Persistent menu commonly found at the top of an app.",
	},
	"native-select": {
		title: "Native Select",
		description: "Wrapper around the native HTML select for simple cases.",
	},
	"navigation-menu": {
		title: "Navigation Menu",
		description: "Collection of links for navigating between pages.",
	},
	pagination: {
		title: "Pagination",
		description: "Page navigation controls with next, previous, and pages.",
	},
	popover: {
		title: "Popover",
		description: "Floating content that opens next to a trigger.",
	},
	progress: {
		title: "Progress",
		description: "Indicator showing the completion progress of a task.",
	},
	"radio-group": {
		title: "Radio Group",
		description: "Set of checkable buttons where only one may be selected.",
	},
	resizable: {
		title: "Resizable",
		description: "Accessible resizable panel groups and layouts.",
	},
	"scroll-area": {
		title: "Scroll Area",
		description: "Custom scrollable region replacing the native scrollbar.",
	},
	select: {
		title: "Select",
		description: "Displays a list of options for the user to pick one from.",
	},
	separator: {
		title: "Separator",
		description: "Visually or semantically separates content.",
	},
	sheet: {
		title: "Sheet",
		description: "Side-anchored dialog for supplementary content.",
	},
	sidebar: {
		title: "Sidebar",
		description: "Composable, themeable, customizable sidebar component.",
	},
	skeleton: {
		title: "Skeleton",
		description: "Placeholder shimmer while content is loading.",
	},
	slider: {
		title: "Slider",
		description: "Input where the user selects a value from a given range.",
	},
	sonner: {
		title: "Sonner",
		description: "Opinionated toast component for React.",
	},
	spinner: {
		title: "Spinner",
		description: "Loading indicator for asynchronous work.",
	},
	switch: {
		title: "Switch",
		description: "Toggle control for switching between two states.",
	},
	table: {
		title: "Table",
		description: "Responsive table component for tabular data.",
	},
	tabs: {
		title: "Tabs",
		description: "Layered sections of content, displayed one at a time.",
	},
	textarea: {
		title: "Textarea",
		description: "Multi-line text input for longer-form content.",
	},
	toggle: {
		title: "Toggle",
		description: "Two-state button for on/off interactions.",
	},
	"toggle-group": {
		title: "Toggle Group",
		description: "Set of two-state buttons with single or multi selection.",
	},
	tooltip: {
		title: "Tooltip",
		description: "Popup showing extra information for an element on hover.",
	},
}

export function getComponentMeta(slug: string): ComponentMeta {
	const curated = COMPONENT_META[slug]
	if (curated) return curated
	return { title: titleCase(slug), description: "" }
}

export function getComponentSlugs(): string[] {
	return Object.keys(examples).sort()
}
