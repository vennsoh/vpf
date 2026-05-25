"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "@workspace/ui/components/button"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@workspace/ui/components/popover"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@workspace/ui/components/select"
import { Slider } from "@workspace/ui/components/slider"
import {
	ToggleGroup,
	ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"

import { useDesignSystem } from "@/components/design-system-provider"

const COLOR_PRESETS = ["stone", "zinc", "neutral", "gray", "slate"] as const

export function ThemeCustomizer() {
	const { color, radius, setColor, setRadius } = useDesignSystem()
	const { theme, setTheme } = useTheme()
	const radiusNumber = Number.parseFloat(radius)

	return (
		<Popover>
			<PopoverTrigger
				render={
					<Button variant="outline" size="sm">
						Customize
					</Button>
				}
			/>
			<PopoverContent align="end" className="w-80">
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-1.5">
						<label className="text-xs font-medium text-muted-foreground">
							Color
						</label>
						<Select
							value={color}
							onValueChange={(v) => {
								if (typeof v === "string") setColor(v)
							}}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select color" />
							</SelectTrigger>
							<SelectContent>
								{COLOR_PRESETS.map((c) => (
									<SelectItem key={c} value={c}>
										{c.charAt(0).toUpperCase() + c.slice(1)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="flex flex-col gap-1.5">
						<div className="flex items-center justify-between">
							<label className="text-xs font-medium text-muted-foreground">
								Radius
							</label>
							<span className="font-mono text-xs text-muted-foreground">
								{radiusNumber.toFixed(2)}rem
							</span>
						</div>
						<Slider
							min={0}
							max={1}
							step={0.05}
							value={[radiusNumber]}
							onValueChange={(v) => {
								const next = Array.isArray(v) ? v[0] : v
								if (typeof next === "number") {
									setRadius(next.toFixed(2))
								}
							}}
						/>
					</div>

					<div className="flex flex-col gap-1.5">
						<label className="text-xs font-medium text-muted-foreground">
							Mode
						</label>
						<ToggleGroup
							value={[theme ?? "system"]}
							onValueChange={(v: string[]) => {
								const next = v[0] ?? "system"
								setTheme(next)
							}}
						>
							<ToggleGroupItem value="light">Light</ToggleGroupItem>
							<ToggleGroupItem value="dark">Dark</ToggleGroupItem>
							<ToggleGroupItem value="system">System</ToggleGroupItem>
						</ToggleGroup>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
