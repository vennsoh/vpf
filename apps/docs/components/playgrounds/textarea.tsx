"use client"

import { Textarea } from "@vpf/ui/components/textarea"

import {
	PropsPlayground,
	usePlaygroundValues,
} from "@/components/props-playground"

const textareaSchema = {
	placeholder: {
		type: "text",
		label: "Placeholder",
		default: "Type your message here.",
	},
	rows: {
		type: "number",
		label: "Rows",
		min: 2,
		max: 12,
		step: 1,
		default: 4,
	},
	disabled: {
		type: "boolean",
		label: "Disabled",
		default: false,
	},
} as const

function TextareaPreview() {
	const v = usePlaygroundValues(textareaSchema)
	return (
		<Textarea
			placeholder={v.placeholder}
			rows={v.rows}
			disabled={v.disabled}
			className="w-full max-w-sm"
		/>
	)
}

export default function TextareaPlayground() {
	return (
		<PropsPlayground schema={textareaSchema}>
			<TextareaPreview />
		</PropsPlayground>
	)
}
