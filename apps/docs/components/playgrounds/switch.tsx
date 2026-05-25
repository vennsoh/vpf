"use client"

import { Label } from "@workspace/ui/components/label"
import { Switch } from "@workspace/ui/components/switch"

import {
	PropsPlayground,
	usePlaygroundValues,
} from "@/components/props-playground"

const switchSchema = {
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
		default: "Airplane mode",
	},
} as const

function SwitchPreview() {
	const v = usePlaygroundValues(switchSchema)
	return (
		<div className="flex items-center gap-2">
			<Switch id="playground-switch" checked={v.checked} disabled={v.disabled} />
			<Label htmlFor="playground-switch">{v.label}</Label>
		</div>
	)
}

export default function SwitchPlayground() {
	return (
		<PropsPlayground schema={switchSchema}>
			<SwitchPreview />
		</PropsPlayground>
	)
}
