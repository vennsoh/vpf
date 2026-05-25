import { IconGitBranch } from "@tabler/icons-react"

import { Button } from "@vpf/ui/components/button"

export default function ButtonWithIcon() {
  return (
    <Button variant="outline" size="sm">
      <IconGitBranch /> New Branch
    </Button>
  )
}
