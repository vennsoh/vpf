"use client"

import { Slider } from "@workspace/ui/components/slider"

import {
	PropsPlayground,
	usePlaygroundValues,
} from "@/components/props-playground"

const sliderSchema = {
	value: {
		type: "number",
		label: "Value",
		min: 0,
		max: 100,
		step: 1,
		default: 50,
	},
	min: {
		type: "number",
		label: "Min",
		min: 0,
		max: 50,
		step: 1,
		default: 0,
	},
	max: {
		type: "number",
		label: "Max",
		min: 50,
		max: 200,
		step: 1,
		default: 100,
	},
	step: {
		type: "number",
		label: "Step",
		min: 1,
		max: 25,
		step: 1,
		default: 1,
	},
	disabled: {
		type: "boolean",
		label: "Disabled",
		default: false,
	},
} as const

function SliderPreview() {
	const v = usePlaygroundValues(sliderSchema)
	return (
		<Slider
			value={[v.value]}
			min={v.min}
			max={v.max}
			step={v.step}
			disabled={v.disabled}
			className="w-full max-w-sm"
		/>
	)
}

export default function SliderPlayground() {
	return (
		<PropsPlayground schema={sliderSchema}>
			<SliderPreview />
		</PropsPlayground>
	)
}
