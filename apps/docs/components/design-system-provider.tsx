"use client"

import * as React from "react"

type DesignSystemContextValue = {
	color: string
	radius: string
	setColor: (color: string) => void
	setRadius: (radius: string) => void
}

const COLOR_STORAGE_KEY = "vpf:color"
const RADIUS_STORAGE_KEY = "vpf:radius"
const DEFAULT_COLOR = "stone"
const DEFAULT_RADIUS = "0.5"

const DesignSystemContext = React.createContext<DesignSystemContextValue | null>(
	null
)

function applyTheme(color: string, radius: string) {
	if (typeof document === "undefined") return
	document.documentElement.dataset.theme = color
	document.documentElement.style.setProperty("--radius", `${radius}rem`)
}

function DesignSystemProvider({ children }: { children: React.ReactNode }) {
	const [color, setColorState] = React.useState<string>(DEFAULT_COLOR)
	const [radius, setRadiusState] = React.useState<string>(DEFAULT_RADIUS)
	const [mounted, setMounted] = React.useState(false)

	// Hydrate from localStorage on mount.
	React.useEffect(() => {
		try {
			const storedColor = window.localStorage.getItem(COLOR_STORAGE_KEY)
			const storedRadius = window.localStorage.getItem(RADIUS_STORAGE_KEY)
			const nextColor = storedColor ?? DEFAULT_COLOR
			const nextRadius = storedRadius ?? DEFAULT_RADIUS
			setColorState(nextColor)
			setRadiusState(nextRadius)
			applyTheme(nextColor, nextRadius)
		} catch {
			applyTheme(DEFAULT_COLOR, DEFAULT_RADIUS)
		}
		setMounted(true)
	}, [])

	// Apply on every change once mounted.
	React.useEffect(() => {
		if (!mounted) return
		applyTheme(color, radius)
		try {
			window.localStorage.setItem(COLOR_STORAGE_KEY, color)
			window.localStorage.setItem(RADIUS_STORAGE_KEY, radius)
		} catch {
			// ignore storage errors (private mode, etc.)
		}
	}, [color, radius, mounted])

	const setColor = React.useCallback((next: string) => {
		setColorState(next)
	}, [])

	const setRadius = React.useCallback((next: string) => {
		setRadiusState(next)
	}, [])

	const value = React.useMemo<DesignSystemContextValue>(
		() => ({ color, radius, setColor, setRadius }),
		[color, radius, setColor, setRadius]
	)

	return (
		<DesignSystemContext.Provider value={value}>
			{children}
		</DesignSystemContext.Provider>
	)
}

function useDesignSystem(): DesignSystemContextValue {
	const ctx = React.useContext(DesignSystemContext)
	if (!ctx) {
		throw new Error(
			"useDesignSystem must be used within a DesignSystemProvider"
		)
	}
	return ctx
}

export { DesignSystemProvider, useDesignSystem }
