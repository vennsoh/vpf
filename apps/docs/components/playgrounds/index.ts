import dynamic from "next/dynamic"
import type { ComponentType } from "react"

/**
 * Map of component slug -> client playground component (dynamically loaded).
 * Slugs not present here simply don't render a playground.
 *
 * Each target file has `"use client"` so it's already a Client Component;
 * we omit `{ ssr: false }` because that option is illegal for `next/dynamic`
 * calls reached from a Server Component in Next.js 16.
 */
export const PLAYGROUNDS: Record<string, ComponentType> = {
	alert: dynamic(() => import("./alert")),
	avatar: dynamic(() => import("./avatar")),
	badge: dynamic(() => import("./badge")),
	button: dynamic(() => import("./button")),
	checkbox: dynamic(() => import("./checkbox")),
	dialog: dynamic(() => import("./dialog")),
	"dropdown-menu": dynamic(() => import("./dropdown-menu")),
	input: dynamic(() => import("./input")),
	progress: dynamic(() => import("./progress")),
	skeleton: dynamic(() => import("./skeleton")),
	slider: dynamic(() => import("./slider")),
	switch: dynamic(() => import("./switch")),
	tabs: dynamic(() => import("./tabs")),
	textarea: dynamic(() => import("./textarea")),
	tooltip: dynamic(() => import("./tooltip")),
}

export function hasPlayground(slug: string): boolean {
	return slug in PLAYGROUNDS
}
