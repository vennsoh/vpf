import { Italic } from "lucide-react"

import { Toggle } from "@vpf/ui/components/toggle"

export default function ToggleSm() {
  return (
    <Toggle size="sm" aria-label="Toggle italic">
      <Italic />
    </Toggle>
  )
}
