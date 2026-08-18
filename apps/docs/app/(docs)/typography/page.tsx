import type { Metadata } from "next"

import { Card, CardContent } from "@vpf/ui/components/card"
import { Separator } from "@vpf/ui/components/separator"
import { cn } from "@vpf/ui/lib/utils"

import { pixelFonts } from "@/lib/fonts"

export const metadata: Metadata = {
  title: "Typography",
  description:
    "The Geist type system — Geist Sans, Geist Mono, and Geist Pixel — and the design tokens that expose them.",
}

const SPECIMEN = "The quick brown fox jumps over the lazy dog"
const NUMERALS = "0123456789 — ilI1 oO0 ({[<@#$%&>]})"

const SANS_WEIGHTS = [
  { label: "Light 300", className: "font-light" },
  { label: "Regular 400", className: "font-normal" },
  { label: "Medium 500", className: "font-medium" },
  { label: "Semibold 600", className: "font-semibold" },
  { label: "Bold 700", className: "font-bold" },
  { label: "Black 900", className: "font-black" },
]

const TYPE_SCALE = [
  { label: "text-4xl", className: "text-4xl" },
  { label: "text-3xl", className: "text-3xl" },
  { label: "text-2xl", className: "text-2xl" },
  { label: "text-xl", className: "text-xl" },
  { label: "text-base", className: "text-base" },
  { label: "text-sm", className: "text-sm" },
  { label: "text-xs", className: "text-xs" },
]

function TokenRow({
  token,
  cssVariable,
  description,
}: {
  token: string
  cssVariable: string
  description: string
}) {
  return (
    <div className="grid grid-cols-1 gap-1 py-2.5 sm:grid-cols-[10rem_14rem_1fr] sm:items-baseline sm:gap-4">
      <code className="font-mono text-xs text-foreground">{token}</code>
      <code className="font-mono text-xs text-muted-foreground">
        {cssVariable}
      </code>
      <span className="text-xs text-muted-foreground">{description}</span>
    </div>
  )
}

function Section({
  title,
  token,
  meta,
  children,
}: {
  title: string
  token: string
  meta: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="font-heading text-xl font-medium tracking-tight">
          {title}
        </h2>
        <code className="font-mono text-xs text-muted-foreground">{token}</code>
        <span className="text-xs text-muted-foreground">{meta}</span>
      </div>
      {children}
    </section>
  )
}

export default function TypographyPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
      <header className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Typography
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          The system runs on{" "}
          <a
            href="https://vercel.com/font"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Geist
          </a>
          . Fonts are self-hosted through the <code>geist</code> package and
          reach components only as design tokens — never as a literal family
          name.
        </p>
      </header>

      <section className="flex flex-col gap-2">
        <h2 className="font-heading text-xl font-medium tracking-tight">
          Tokens
        </h2>
        <Card>
          <CardContent className="divide-y">
            <TokenRow
              token="font-sans"
              cssVariable="--font-sans"
              description="Geist Sans. The default for all body and UI text."
            />
            <TokenRow
              token="font-heading"
              cssVariable="--font-heading"
              description="Headings and titles. Currently aliases Geist Sans."
            />
            <TokenRow
              token="font-mono"
              cssVariable="--font-mono"
              description="Geist Mono. Code, tabular numbers, and identifiers."
            />
            <TokenRow
              token="font-pixel"
              cssVariable="--font-pixel"
              description="Geist Pixel Square. Display and decorative type."
            />
            <TokenRow
              token="font-pixel-{shape}"
              cssVariable="--font-pixel-{shape}"
              description="The grid, circle, triangle, and line pixel shapes."
            />
          </CardContent>
        </Card>
      </section>

      <Separator />

      <Section
        title="Geist Sans"
        token="font-sans"
        meta="Variable · 100–900 · --font-geist-sans"
      >
        <p className="font-sans text-3xl tracking-tight">{SPECIMEN}</p>
        <p className="font-sans text-sm text-muted-foreground">{NUMERALS}</p>
        <Card>
          <CardContent className="flex flex-col divide-y">
            {SANS_WEIGHTS.map((weight) => (
              <div
                key={weight.label}
                className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:items-baseline sm:gap-4"
              >
                <code className="w-32 shrink-0 font-mono text-xs text-muted-foreground">
                  {weight.className}
                </code>
                <span className={cn("font-sans text-lg", weight.className)}>
                  {weight.label}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </Section>

      <Section
        title="Geist Mono"
        token="font-mono"
        meta="Variable · 100–900 · --font-geist-mono"
      >
        <p className="font-mono text-2xl">{SPECIMEN}</p>
        <p className="font-mono text-sm text-muted-foreground">{NUMERALS}</p>
        <Card>
          <CardContent>
            <pre className="overflow-x-auto font-mono text-sm">
              <code>{`const tokens = {\n  sans: "var(--font-sans)",\n  mono: "var(--font-mono)",\n  pixel: "var(--font-pixel)",\n}`}</code>
            </pre>
          </CardContent>
        </Card>
      </Section>

      <Section
        title="Geist Pixel"
        token="font-pixel"
        meta="Weight 500 · five shapes · --font-geist-pixel-*"
      >
        <p className="max-w-2xl text-sm text-muted-foreground">
          A display face built from five repeating shapes. Each shape is its own
          token; unloaded shapes fall back to Square, then to Geist Mono.
        </p>
        <Card>
          <CardContent className="flex flex-col divide-y">
            {pixelFonts.map((entry) => (
              <div key={entry.name} className="flex flex-col gap-1.5 py-4">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="text-sm font-medium">{entry.name}</span>
                  <code className="font-mono text-xs text-muted-foreground">
                    {entry.token}
                  </code>
                </div>
                <p
                  className="overflow-x-auto text-2xl whitespace-nowrap"
                  style={{ fontFamily: entry.font.style.fontFamily }}
                >
                  Geist Pixel 0123456789
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </Section>

      <Separator />

      <Section title="Scale" token="text-*" meta="Applied to font-heading">
        <Card>
          <CardContent className="flex flex-col divide-y">
            {TYPE_SCALE.map((step) => (
              <div
                key={step.label}
                className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:items-baseline sm:gap-4"
              >
                <code className="w-32 shrink-0 font-mono text-xs text-muted-foreground">
                  {step.label}
                </code>
                <span
                  className={cn("font-heading tracking-tight", step.className)}
                >
                  {SPECIMEN}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </Section>
    </div>
  )
}
