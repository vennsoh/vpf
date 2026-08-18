import { GeistMono } from "geist/font/mono"
import { GeistPixelSquare } from "geist/font/pixel"
import { GeistSans } from "geist/font/sans"

/**
 * Geist type system — https://vercel.com/font
 *
 * Each font exposes a CSS variable (`--font-geist-sans`, `--font-geist-mono`,
 * `--font-geist-pixel-square`). The design tokens in `@vpf/ui/globals.css` read
 * those variables and republish them as the `font-sans` / `font-mono` /
 * `font-heading` / `font-pixel` utilities, so components never name a font
 * family directly.
 *
 * This app loads the pixel *Square* face only. The other pixel shapes (grid,
 * circle, triangle, line) are documented in `apps/docs`; their tokens fall back
 * to Square wherever they aren't loaded.
 */
export const fontSans = GeistSans
export const fontMono = GeistMono
export const fontPixel = GeistPixelSquare

/** Every font variable, ready to put on `<html>`. */
export const fontVariables = [
  fontSans.variable,
  fontMono.variable,
  fontPixel.variable,
].join(" ")
