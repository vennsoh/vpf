"use client"

import { Button } from "@workspace/ui/components/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

import {
	PropsPlayground,
	usePlaygroundValues,
} from "@/components/props-playground"

const menuSchema = {
	side: {
		type: "select",
		label: "Side",
		options: ["top", "right", "bottom", "left"],
		default: "bottom",
	},
	align: {
		type: "select",
		label: "Align",
		options: ["start", "center", "end"],
		default: "start",
	},
	label: {
		type: "text",
		label: "Trigger label",
		default: "Open menu",
	},
} as const

function DropdownMenuPreview() {
	const v = usePlaygroundValues(menuSchema)
	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button variant="outline">{v.label}</Button>} />
			<DropdownMenuContent side={v.side} align={v.align} className="w-48">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem>Billing</DropdownMenuItem>
				<DropdownMenuItem>Team</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Log out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default function DropdownMenuPlayground() {
	return (
		<PropsPlayground schema={menuSchema}>
			<DropdownMenuPreview />
		</PropsPlayground>
	)
}
