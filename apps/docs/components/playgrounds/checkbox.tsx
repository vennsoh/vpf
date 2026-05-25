"use client"

import { Checkbox } from "@workspace/ui/components/checkbox"
import { Label } from "@workspace/ui/components/label"

import {
	PropsPlayground,
	usePlaygroundValues,
} from "@/components/props-playground"

const checkboxSchema = {
	checked: {
		type: "boolean",
		label: "Checked",
		default: false,
	},
	disabled: {
		type: "boolean",
		label: "Disabled",
		default: false,
	},
	label: {
		type: "text",
		label: "Label",
		default: "Accept terms",
	},
} as const

function CheckboxPreview() {
	const v = usePlaygroundValues(checkboxSchema)
	return (
		<div className="flex items-center gap-2">
			<Checkbox
				id="playground-checkbox"
				checked={v.checked}
				disabled={v.disabled}
			/>
			<Label htmlFor="playground-checkbox">{v.label}</Label>
		</div>
	)
}

export default function CheckboxPlayground() {
	return (
		<PropsPlayground schema={checkboxSchema}>
			<CheckboxPreview />
		</PropsPlayground>
	)
}
