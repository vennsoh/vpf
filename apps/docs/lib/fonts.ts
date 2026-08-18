import { GeistMono } from "geist/font/mono"
import {
  GeistPixelCircle,
  GeistPixelGrid,
  GeistPixelLine,
  GeistPixelSquare,
  GeistPixelTriangle,
} from "geist/font/pixel"
import { GeistSans } from "geist/font/sans"

/**
 * Geist type system — https://vercel.com/font
 *
 * Each font exposes a CSS variable (`--font-geist-sans`, `--font-geist-mono`,
 * `--font-geist-pixel-*`). The design tokens in `@vpf/ui/globals.css` read those
 * variables and republish them as the `font-sans` / `font-mono` /
 * `font-heading` / `font-pixel*` utilities, so components never name a font
 * family directly.
 *
 * The docs app loads all five Geist Pixel shapes because it documents them.
 * Product apps should load only the shapes they use — the tokens fall back to
 * Square, then to Geist Mono, wherever a shape isn't loaded.
 */
export const fontSans = GeistSans
export const fontMono = GeistMono
export const fontPixel = GeistPixelSquare

export const pixelFonts = [
  { name: "Square", token: "font-pixel", font: GeistPixelSquare },
  { name: "Grid", token: "font-pixel-grid", font: GeistPixelGrid },
  { name: "Circle", token: "font-pixel-circle", font: GeistPixelCircle },
  { name: "Triangle", token: "font-pixel-triangle", font: GeistPixelTriangle },
  { name: "Line", token: "font-pixel-line", font: GeistPixelLine },
] as const

/** Every font variable, ready to put on `<html>`. */
export const fontVariables = [
  fontSans.variable,
  fontMono.variable,
  ...pixelFonts.map((entry) => entry.font.variable),
].join(" ")
