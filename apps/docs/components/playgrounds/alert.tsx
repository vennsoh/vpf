"use client"

import {
	Alert,
	AlertDescription,
	AlertTitle,
} from "@workspace/ui/components/alert"

import {
	PropsPlayground,
	usePlaygroundValues,
} from "@/components/props-playground"

const alertSchema = {
	variant: {
		type: "select",
		label: "Variant",
		options: ["default", "destructive"],
		default: "default",
	},
	title: {
		type: "text",
		label: "Title",
		default: "Heads up!",
	},
	description: {
		type: "text",
		label: "Description",
		default: "You can change this text in the controls.",
	},
} as const

function AlertPreview() {
	const v = usePlaygroundValues(alertSchema)
	return (
		<Alert variant={v.variant} className="max-w-md">
			<AlertTitle>{v.title}</AlertTitle>
			<AlertDescription>{v.description}</AlertDescription>
		</Alert>
	)
}

export default function AlertPlayground() {
	return (
		<PropsPlayground schema={alertSchema}>
			<AlertPreview />
		</PropsPlayground>
	)
}
