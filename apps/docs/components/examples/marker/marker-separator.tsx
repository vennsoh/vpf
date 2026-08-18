import { IconCheck, IconGitBranch } from "@tabler/icons-react"

import { Button } from "@vpf/ui/components/button"
import { Marker, MarkerContent, MarkerIcon } from "@vpf/ui/components/marker"
import { Spinner } from "@vpf/ui/components/spinner"

export default function MarkerSeparator() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <Marker variant="separator">
        <MarkerContent>Worked for 42s</MarkerContent>
      </Marker>
      <Marker variant="separator" role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent>Compacting conversation</MarkerContent>
      </Marker>
      <Marker variant="separator" role="status">
        <MarkerContent className="shimmer">Reading 4 files</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerIcon>
          <IconCheck />
        </MarkerIcon>
        <MarkerContent>Conversation compacted</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>
          With a <a href="#">link to learn more</a>
        </MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>
          <Button variant="outline">
            <IconGitBranch />
            Button
          </Button>
        </MarkerContent>
      </Marker>
    </div>
  )
}
