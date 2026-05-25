"use client"

import { Button } from "@workspace/ui/components/button"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@workspace/ui/components/tooltip"

import {
	PropsPlayground,
	usePlaygroundValues,
} from "@/components/props-playground"

const tooltipSchema = {
	side: {
		type: "select",
		label: "Side",
		options: ["top", "right", "bottom", "left"],
		default: "top",
	},
	align: {
		type: "select",
		label: "Align",
		options: ["start", "center", "end"],
		default: "center",
	},
	content: {
		type: "text",
		label: "Content",
		default: "Tooltip content",
	},
} as const

function TooltipPreview() {
	const v = usePlaygroundValues(tooltipSchema)
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger
					render={<Button variant="outline">Hover me</Button>}
				/>
				<TooltipContent side={v.side} align={v.align}>
					{v.content}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default function TooltipPlayground() {
	return (
		<PropsPlayground schema={tooltipSchema}>
			<TooltipPreview />
		</PropsPlayground>
	)
}
