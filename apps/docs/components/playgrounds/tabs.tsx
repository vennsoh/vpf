"use client"

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@vpf/ui/components/tabs"

import {
	PropsPlayground,
	usePlaygroundValues,
} from "@/components/props-playground"

const tabsSchema = {
	variant: {
		type: "select",
		label: "Variant",
		options: ["default", "line"],
		default: "line",
	},
} as const

function TabsPreview() {
	const v = usePlaygroundValues(tabsSchema)

	return (
		<Tabs defaultValue="overview" className="w-full max-w-md">
			<TabsList variant={v.variant}>
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="activity">Activity</TabsTrigger>
				<TabsTrigger value="settings">Settings</TabsTrigger>
			</TabsList>
			<TabsContent value="overview" className="rounded-md border p-4">
				Overview content
			</TabsContent>
			<TabsContent value="activity" className="rounded-md border p-4">
				Activity content
			</TabsContent>
			<TabsContent value="settings" className="rounded-md border p-4">
				Settings content
			</TabsContent>
		</Tabs>
	)
}

export default function TabsPlayground() {
	return (
		<PropsPlayground schema={tabsSchema}>
			<TabsPreview />
		</PropsPlayground>
	)
}
