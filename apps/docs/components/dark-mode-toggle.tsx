"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

import { Button } from "@vpf/ui/components/button"

export function DarkModeToggle() {
	const { resolvedTheme, setTheme } = useTheme()
	const [mounted, setMounted] = React.useState(false)

	React.useEffect(() => {
		setMounted(true)
	}, [])

	const isDark = mounted && resolvedTheme === "dark"

	return (
		<Button
			variant="outline"
			size="icon"
			aria-label="Toggle dark mode"
			onClick={() => setTheme(isDark ? "light" : "dark")}
		>
			{isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
		</Button>
	)
}
