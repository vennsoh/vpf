"use client"

import { Badge } from "@vpf/ui/components/badge"

import {
	PropsPlayground,
	usePlaygroundValues,
} from "@/components/props-playground"

const badgeSchema = {
	variant: {
		type: "select",
		label: "Variant",
		options: ["default", "secondary", "destructive", "outline"],
		default: "default",
	},
	label: {
		type: "text",
		label: "Label",
		default: "Badge",
	},
} as const

function BadgePreview() {
	const v = usePlaygroundValues(badgeSchema)
	return <Badge variant={v.variant}>{v.label}</Badge>
}

export default function BadgePlayground() {
	return (
		<PropsPlayground schema={badgeSchema}>
			<BadgePreview />
		</PropsPlayground>
	)
}
