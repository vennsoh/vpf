import { IconPlus } from "@tabler/icons-react"

import { Button } from "@workspace/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@workspace/ui/components/button-group"

export default function ButtonGroupSplit() {
  return (
    <ButtonGroup>
      <Button variant="secondary">Button</Button>
      <ButtonGroupSeparator />
      <Button size="icon" variant="secondary">
        <IconPlus />
      </Button>
    </ButtonGroup>
  )
}
