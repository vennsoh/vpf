"use client"

import { Skeleton } from "@vpf/ui/components/skeleton"

import {
	PropsPlayground,
	usePlaygroundValues,
} from "@/components/props-playground"

const skeletonSchema = {
	width: {
		type: "number",
		label: "Width (px)",
		min: 50,
		max: 400,
		step: 10,
		default: 240,
	},
	height: {
		type: "number",
		label: "Height (px)",
		min: 8,
		max: 200,
		step: 4,
		default: 20,
	},
	rounded: {
		type: "select",
		label: "Radius",
		options: ["sm", "md", "lg", "full"],
		default: "md",
	},
} as const

function SkeletonPreview() {
	const v = usePlaygroundValues(skeletonSchema)
	return (
		<Skeleton
			style={{ width: v.width, height: v.height }}
			className={
				v.rounded === "full"
					? "rounded-full"
					: v.rounded === "sm"
						? "rounded-sm"
						: v.rounded === "lg"
							? "rounded-lg"
							: "rounded-md"
			}
		/>
	)
}

export default function SkeletonPlayground() {
	return (
		<PropsPlayground schema={skeletonSchema}>
			<SkeletonPreview />
		</PropsPlayground>
	)
}
