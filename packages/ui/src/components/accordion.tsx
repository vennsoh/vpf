import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"

import { cn } from "@vpf/ui/lib/utils"
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react"

type AccordionProps = Omit<
  AccordionPrimitive.Root.Props,
  "defaultValue" | "multiple" | "onValueChange" | "value"
> & {
  type?: "single" | "multiple"
  collapsible?: boolean
  defaultValue?: AccordionPrimitive.Root.Value | string
  multiple?: boolean
  onValueChange?: (
    value: AccordionPrimitive.Root.Value | string,
    eventDetails: AccordionPrimitive.Root.ChangeEventDetails
  ) => void
  value?: AccordionPrimitive.Root.Value | string
}

function Accordion({
  className,
  type,
  collapsible,
  defaultValue,
  multiple,
  onValueChange,
  value,
  ...props
}: AccordionProps) {
  const usesRadixValueShape = type !== undefined
  const preventsEmptyValue = type === "single" && collapsible !== true
  const toBaseValue = (
    nextValue: AccordionPrimitive.Root.Value | string | undefined
  ) => (typeof nextValue === "string" ? [nextValue] : nextValue)

  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      data-collapsible={collapsible || undefined}
      className={cn("flex w-full flex-col", className)}
      defaultValue={toBaseValue(defaultValue)}
      multiple={multiple ?? (type === "multiple" ? true : undefined)}
      onValueChange={
        preventsEmptyValue || onValueChange
          ? (nextValue, eventDetails) => {
              if (preventsEmptyValue && nextValue.length === 0) {
                eventDetails.cancel()
                return
              }

              onValueChange?.(
                usesRadixValueShape && type === "single"
                  ? (nextValue[0] ?? "")
                  : nextValue,
                eventDetails
              )
            }
          : undefined
      }
      value={toBaseValue(value)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
        <IconChevronDown
          data-slot="accordion-trigger-icon"
          className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
        />
        <IconChevronUp
          data-slot="accordion-trigger-icon"
          className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) pt-0 pb-2.5 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
