"use client"

import type * as React from "react"
import dynamic from "next/dynamic"

type Props = {
  importPath: string
}

type BlockModule = Record<string, unknown> & {
  default?: React.ComponentType
}

function componentNameFromPath(blockPath: string) {
  const fileName = blockPath.split("/").at(-1) ?? ""

  return fileName
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

function resolveBlockComponent(module: BlockModule, blockPath: string) {
  const componentName = componentNameFromPath(blockPath)
  const Component = module.default ?? module[componentName]

  if (!Component) {
    throw new Error(
      `Block module "${blockPath}" does not export default or ${componentName}.`
    )
  }

  return Component as React.ComponentType
}

const blockComponentCache = new Map<string, React.ComponentType>()

function getBlockComponent(importPath: string) {
  const cachedComponent = blockComponentCache.get(importPath)
  if (cachedComponent) return cachedComponent

  const blockPath = importPath.replace(/^@\/components\/blocks\//, "")
  const Component = dynamic(
    () =>
      import(`@/components/blocks/${blockPath}`).then((module) => ({
        default: resolveBlockComponent(module, blockPath),
      })),
    { ssr: false, loading: () => null }
  )

  blockComponentCache.set(importPath, Component)
  return Component
}

function RenderBlock({ Component }: { Component: React.ComponentType }) {
  return <Component />
}

/**
 * Client-side dynamic loader for synced block components.
 *
 * Same rationale as `ExampleLoader`: `next/dynamic` with `ssr: false` is
 * only legal inside Client Components in Next.js 16. The template literal is
 * scoped to the `@/components/blocks/` subtree so the eager compile only
 * walks blocks.
 */
export function BlockLoader({ importPath }: Props) {
  return <RenderBlock Component={getBlockComponent(importPath)} />
}
