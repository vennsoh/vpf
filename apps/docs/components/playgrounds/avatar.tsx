"use client"

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@workspace/ui/components/avatar"

import {
	PropsPlayground,
	usePlaygroundValues,
} from "@/components/props-playground"

const avatarSchema = {
	size: {
		type: "select",
		label: "Size",
		options: ["sm", "default", "lg"],
		default: "default",
	},
	src: {
		type: "text",
		label: "Image URL",
		default: "https://github.com/shadcn.png",
		placeholder: "Leave empty to show fallback",
	},
	fallback: {
		type: "text",
		label: "Fallback",
		default: "CN",
	},
} as const

function AvatarPreview() {
	const v = usePlaygroundValues(avatarSchema)
	return (
		<Avatar size={v.size}>
			{v.src ? <AvatarImage src={v.src} alt="User" /> : null}
			<AvatarFallback>{v.fallback}</AvatarFallback>
		</Avatar>
	)
}

export default function AvatarPlayground() {
	return (
		<PropsPlayground schema={avatarSchema}>
			<AvatarPreview />
		</PropsPlayground>
	)
}
