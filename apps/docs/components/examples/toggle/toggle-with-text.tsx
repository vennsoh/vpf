import { Italic } from "lucide-react"

import { Toggle } from "@vpf/ui/components/toggle"

export default function ToggleWithText() {
  return (
    <Toggle aria-label="Toggle italic">
      <Italic />
      Italic
    </Toggle>
  )
}
