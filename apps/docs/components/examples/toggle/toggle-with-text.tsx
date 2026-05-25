import { Italic } from "lucide-react"

import { Toggle } from "@workspace/ui/components/toggle"

export default function ToggleWithText() {
  return (
    <Toggle aria-label="Toggle italic">
      <Italic />
      Italic
    </Toggle>
  )
}
