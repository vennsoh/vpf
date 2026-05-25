import { SiteHeader } from "@/components/site-header"
import { SiteSidebar } from "@/components/site-sidebar"

export default function DocsLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex min-h-svh flex-col">
			<SiteHeader />
			<div className="flex flex-1">
				<SiteSidebar />
				<main className="flex-1 px-6 py-8">{children}</main>
			</div>
		</div>
	)
}
