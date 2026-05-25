"use client"

import { Button } from "@workspace/ui/components/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@workspace/ui/components/dialog"

import {
	PropsPlayground,
	usePlaygroundValues,
} from "@/components/props-playground"

const dialogSchema = {
	title: {
		type: "text",
		label: "Title",
		default: "Edit profile",
	},
	description: {
		type: "text",
		label: "Description",
		default: "Make changes to your profile here.",
	},
	showCloseButton: {
		type: "boolean",
		label: "Show close icon",
		default: true,
	},
} as const

function DialogPreview() {
	const v = usePlaygroundValues(dialogSchema)
	return (
		<Dialog>
			<DialogTrigger render={<Button variant="outline">Open dialog</Button>} />
			<DialogContent showCloseButton={v.showCloseButton}>
				<DialogHeader>
					<DialogTitle>{v.title}</DialogTitle>
					<DialogDescription>{v.description}</DialogDescription>
				</DialogHeader>
				<DialogFooter showCloseButton />
			</DialogContent>
		</Dialog>
	)
}

export default function DialogPlayground() {
	return (
		<PropsPlayground schema={dialogSchema}>
			<DialogPreview />
		</PropsPlayground>
	)
}
