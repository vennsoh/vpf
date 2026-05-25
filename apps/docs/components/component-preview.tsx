import type { ReactNode } from "react"

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@vpf/ui/components/tabs"

type ComponentPreviewProps = {
	name: string
	source: string
	children: ReactNode
}

export function ComponentPreview({
	name,
	source,
	children,
}: ComponentPreviewProps) {
	const previewValue = `${name}-preview`
	const codeValue = `${name}-code`

	return (
		<Tabs defaultValue={previewValue} className="w-full">
			<TabsList>
				<TabsTrigger value={previewValue}>Preview</TabsTrigger>
				<TabsTrigger value={codeValue}>Code</TabsTrigger>
			</TabsList>
			<TabsContent value={previewValue}>
				<div className="flex min-h-[350px] items-center justify-center rounded-md border p-6">
					{children}
				</div>
			</TabsContent>
			<TabsContent value={codeValue}>
				<pre className="overflow-x-auto rounded-md border bg-muted p-4 text-sm">
					<code>{source}</code>
				</pre>
			</TabsContent>
		</Tabs>
	)
}
