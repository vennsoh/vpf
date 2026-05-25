import { MinusIcon, PlusIcon } from "lucide-react"

import { Button } from "@vpf/ui/components/button"
import { ButtonGroup } from "@vpf/ui/components/button-group"

export default function ButtonGroupOrientation() {
  return (
    <ButtonGroup
      orientation="vertical"
      aria-label="Media controls"
      className="h-fit"
    >
      <Button variant="outline" size="icon">
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon">
        <MinusIcon />
      </Button>
    </ButtonGroup>
  )
}
