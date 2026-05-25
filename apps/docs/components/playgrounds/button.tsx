"use client"

import { Button } from "@vpf/ui/components/button"

import {
	PropsPlayground,
	usePlaygroundValues,
} from "@/components/props-playground"

const buttonSchema = {
	variant: {
		type: "select",
		label: "Variant",
		options: [
			"default",
			"outline",
			"secondary",
			"ghost",
			"destructive",
			"link",
		],
		default: "default",
	},
	size: {
		type: "select",
		label: "Size",
		options: ["xs", "sm", "default", "lg"],
		default: "default",
	},
	label: {
		type: "text",
		label: "Label",
		default: "Button",
	},
	disabled: {
		type: "boolean",
		label: "Disabled",
		default: false,
	},
} as const

function ButtonPreview() {
	const v = usePlaygroundValues(buttonSchema)
	return (
		<Button variant={v.variant} size={v.size} disabled={v.disabled}>
			{v.label}
		</Button>
	)
}

export default function ButtonPlayground() {
	return (
		<PropsPlayground schema={buttonSchema}>
			<ButtonPreview />
		</PropsPlayground>
	)
}
