"use client"

import { Input } from "@workspace/ui/components/input"

import {
	PropsPlayground,
	usePlaygroundValues,
} from "@/components/props-playground"

const inputSchema = {
	type: {
		type: "select",
		label: "Type",
		options: ["text", "email", "password", "number", "search"],
		default: "text",
	},
	placeholder: {
		type: "text",
		label: "Placeholder",
		default: "Enter text...",
	},
	disabled: {
		type: "boolean",
		label: "Disabled",
		default: false,
	},
} as const

function InputPreview() {
	const v = usePlaygroundValues(inputSchema)
	return (
		<Input
			type={v.type}
			placeholder={v.placeholder}
			disabled={v.disabled}
			className="max-w-sm"
		/>
	)
}

export default function InputPlayground() {
	return (
		<PropsPlayground schema={inputSchema}>
			<InputPreview />
		</PropsPlayground>
	)
}
