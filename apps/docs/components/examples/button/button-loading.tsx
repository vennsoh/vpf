import { Button } from "@vpf/ui/components/button"
import { Spinner } from "@vpf/ui/components/spinner"

export default function ButtonLoading() {
  return (
    <Button size="sm" variant="outline" disabled>
      <Spinner />
      Submit
    </Button>
  )
}
