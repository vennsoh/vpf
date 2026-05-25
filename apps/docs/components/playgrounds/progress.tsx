"use client"

import { Progress } from "@workspace/ui/components/progress"

import {
	PropsPlayground,
	usePlaygroundValues,
} from "@/components/props-playground"

const progressSchema = {
	value: {
		type: "number",
		label: "Value",
		min: 0,
		max: 100,
		step: 1,
		default: 60,
	},
} as const

function ProgressPreview() {
	const v = usePlaygroundValues(progressSchema)
	return <Progress value={v.value} className="w-full max-w-sm" />
}

export default function ProgressPlayground() {
	return (
		<PropsPlayground schema={progressSchema}>
			<ProgressPreview />
		</PropsPlayground>
	)
}
