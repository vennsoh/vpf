import Link from "next/link"

import { Button } from "@vpf/ui/components/button"

export default function ButtonAsChild() {
  return (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  )
}
