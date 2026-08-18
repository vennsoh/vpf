import type { Metadata } from "next"
import Script from "next/script"

import "@vpf/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { DesignSystemProvider } from "@/components/design-system-provider"
import { fontVariables } from "@/lib/fonts"
import { cn } from "@vpf/ui/lib/utils"

export const metadata: Metadata = {
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
      className={cn("antialiased", "font-sans", fontVariables)}
    >
      <head>
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body>
        <ThemeProvider>
          <DesignSystemProvider>{children}</DesignSystemProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
