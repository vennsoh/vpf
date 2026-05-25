import { Geist, Geist_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { DesignSystemProvider } from "@/components/design-system-provider"
import { cn } from "@workspace/ui/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
})

export const metadata = {
	title: "VPF Design System",
	description:
		"A personal design system: every shadcn component, block, and example, with global theming.",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={cn(
				"antialiased",
				fontMono.variable,
				"font-sans",
				geist.variable
			)}
		>
			<body>
				<ThemeProvider>
					<DesignSystemProvider>{children}</DesignSystemProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
