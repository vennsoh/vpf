import { SearchIcon } from "lucide-react"

import { Button } from "@vpf/ui/components/button"
import { ButtonGroup } from "@vpf/ui/components/button-group"
import { Input } from "@vpf/ui/components/input"

export default function ButtonGroupInput() {
  return (
    <ButtonGroup>
      <Input placeholder="Search..." />
      <Button variant="outline" aria-label="Search">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  )
}
