import Link from "next/link"

import { CommandPalette } from "@/components/command-palette"
import { ThemeCustomizer } from "@/components/theme-customizer"
import { DarkModeToggle } from "@/components/dark-mode-toggle"

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
			<div className="flex h-14 items-center gap-4 px-6">
				<Link href="/" className="text-sm font-semibold">
					VPF Design System
				</Link>
				<div className="mr-2 flex-1 md:flex-none">
					<CommandPalette />
				</div>
				<div className="ml-auto flex items-center gap-2">
					<ThemeCustomizer />
					<DarkModeToggle />
				</div>
			</div>
		</header>
	)
}
