"use client"

import * as React from "react"

/**
 * Match a CSS media query reactively. Used by synced shadcn examples that
 * gate behavior on viewport width (e.g. drawer-vs-dialog, responsive
 * combobox, responsive breadcrumb).
 */
export function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = React.useState(false)

	React.useEffect(() => {
		if (typeof window === "undefined") return
		const mql = window.matchMedia(query)
		const handler = (event: MediaQueryListEvent) => setMatches(event.matches)
		setMatches(mql.matches)
		mql.addEventListener("change", handler)
		return () => mql.removeEventListener("change", handler)
	}, [query])

	return matches
}
