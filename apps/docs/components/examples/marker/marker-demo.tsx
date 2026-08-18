"use client"

import { toast } from "sonner"

import {
  IconChevronRight,
  IconClock,
  IconFileDescription,
  IconGitBranch,
  IconUserCircle,
} from "@tabler/icons-react"

import { Marker, MarkerContent, MarkerIcon } from "@vpf/ui/components/marker"
import { Spinner } from "@vpf/ui/components/spinner"

export default function MarkerDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <Marker>
        <MarkerContent>A default marker</MarkerContent>
      </Marker>
      <Marker>
        <MarkerIcon>
          <IconFileDescription />
        </MarkerIcon>
        <MarkerContent>Marker with icon</MarkerContent>
      </Marker>
      <Marker role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent>Marker with a spinner</MarkerContent>
      </Marker>
      <Marker role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent className="shimmer">
          Marker with shimmer effect
        </MarkerContent>
      </Marker>
      <Marker role="status">
        <MarkerContent className="shimmer">Thinking...</MarkerContent>
      </Marker>
      <Marker render={<a href="#" />}>
        <MarkerIcon>
          <IconGitBranch />
        </MarkerIcon>
        <MarkerContent>Marker as a link</MarkerContent>
      </Marker>
      <Marker
        render={
          <button
            onClick={() => toast("You clicked the button")}
            className="transition-colors hover:text-foreground"
          />
        }
      >
        <MarkerIcon>
          <IconClock />
        </MarkerIcon>
        <MarkerContent className="flex-1">
          <div>Marker as a button</div>
        </MarkerContent>
        <MarkerIcon>
          <IconChevronRight />
        </MarkerIcon>
      </Marker>
      <Marker>
        <MarkerIcon>
          <IconUserCircle />
        </MarkerIcon>
        <MarkerContent>Rhea joined the chat</MarkerContent>
      </Marker>
      <Marker className="justify-center">
        <MarkerContent>
          <strong className="font-medium">Olivia Rose</strong> left the chat
        </MarkerContent>
      </Marker>
    </div>
  )
}
