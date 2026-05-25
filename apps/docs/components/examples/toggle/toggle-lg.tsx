import { Italic } from "lucide-react"

import { Toggle } from "@vpf/ui/components/toggle"

export default function ToggleLg() {
  return (
    <Toggle size="lg" aria-label="Toggle italic">
      <Italic />
    </Toggle>
  )
}
