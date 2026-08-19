"use client"

import * as React from "react"
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"

function Collapsible({
  asChild,
  children,
  defaultOpen,
  onOpenChange,
  open,
  render,
  ...props
}: CollapsiblePrimitive.Root.Props & { asChild?: boolean }) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(
    defaultOpen ?? false
  )
  const currentOpen = open ?? uncontrolledOpen

  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      data-state={currentOpen ? "open" : "closed"}
      defaultOpen={defaultOpen}
      onOpenChange={(nextOpen, eventDetails) => {
        if (open === undefined) {
          setUncontrolledOpen(nextOpen)
        }
        onOpenChange?.(nextOpen, eventDetails)
      }}
      open={open}
      render={
        asChild ? (React.Children.only(children) as React.ReactElement) : render
      }
      {...props}
    >
      {asChild ? undefined : children}
    </CollapsiblePrimitive.Root>
  )
}

function CollapsibleTrigger({
  asChild,
  children,
  render,
  ...props
}: CollapsiblePrimitive.Trigger.Props & { asChild?: boolean }) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      render={
        asChild ? (React.Children.only(children) as React.ReactElement) : render
      }
      {...props}
    >
      {asChild ? undefined : children}
    </CollapsiblePrimitive.Trigger>
  )
}

function CollapsibleContent({ ...props }: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
