import { Button } from "@vpf/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@vpf/ui/components/tooltip"

export default function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  )
}
