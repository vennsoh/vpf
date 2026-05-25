"use client"

import * as React from "react"
import {
	IconDeviceDesktop,
	IconDeviceTablet,
	IconDeviceMobile,
} from "@tabler/icons-react"

import { Button } from "@vpf/ui/components/button"
import { cn } from "@vpf/ui/lib/utils"

type Width = "desktop" | "tablet" | "mobile"

const WIDTHS: Record<Width, string> = {
	desktop: "100%",
	tablet: "768px",
	mobile: "375px",
}

const ICONS: Record<Width, React.ComponentType> = {
	desktop: IconDeviceDesktop,
	tablet: IconDeviceTablet,
	mobile: IconDeviceMobile,
}

type Props = {
	src: string
	title: string
}

export function BlockPreviewer({ src, title }: Props) {
	const [width, setWidth] = React.useState<Width>("desktop")

	return (
		<div className="flex flex-col gap-3">
			<div className="flex items-center justify-between">
				<div className="text-sm text-muted-foreground">{title}</div>
				<div className="flex items-center gap-1">
					{(Object.keys(WIDTHS) as Width[]).map((key) => {
						const Icon = ICONS[key]
						const active = width === key
						return (
							<Button
								key={key}
								type="button"
								variant={active ? "secondary" : "ghost"}
								size="icon-sm"
								aria-label={`${key} width`}
								aria-pressed={active}
								onClick={() => setWidth(key)}
							>
								<Icon />
							</Button>
						)
					})}
				</div>
			</div>
			<div
				className={cn(
					"mx-auto w-full overflow-hidden rounded-lg border bg-background transition-[max-width] duration-200"
				)}
				style={{ maxWidth: WIDTHS[width] }}
			>
				<iframe
					src={src}
					title={title}
					className="block h-[760px] w-full border-0"
				/>
			</div>
		</div>
	)
}
