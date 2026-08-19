"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@vpf/ui/components/button"
import { ButtonGroup } from "@vpf/ui/components/button-group"

import { CommandPalette } from "@/components/command-palette"
import { ThemeCustomizer } from "@/components/theme-customizer"
import { DarkModeToggle } from "@/components/dark-mode-toggle"

const NAV_ITEMS = [
  { href: "/components", label: "Components" },
  { href: "/blocks", label: "Blocks" },
  { href: "/typography", label: "Typography" },
] as const

function HeaderNavigation({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav aria-label="Documentation sections" className={className}>
      <ButtonGroup>
        {NAV_ITEMS.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <Button
              key={item.href}
              asChild
              variant="outline"
              size="default"
              aria-current={active ? "page" : undefined}
              className={active ? "bg-muted text-foreground" : undefined}
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          )
        })}
      </ButtonGroup>
    </nav>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="flex h-14 items-center gap-2 px-4 md:px-5">
        <Link
          href="/components"
          aria-label="VPF Design System"
          className="mr-2 text-sm font-semibold sm:hidden"
        >
          <span className="sm:hidden">VPF</span>
        </Link>
        <div className="flex-1 md:flex-none">
          <CommandPalette />
        </div>
        <HeaderNavigation className="hidden md:block" />
        <div className="ml-auto flex items-center gap-2">
          <ThemeCustomizer />
          <DarkModeToggle />
        </div>
      </div>
      <HeaderNavigation className="overflow-x-auto border-t px-4 py-1 md:hidden" />
    </header>
  )
}
