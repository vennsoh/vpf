import {
  Bubble,
  BubbleContent,
  BubbleReactions,
} from "@vpf/ui/components/bubble"
import { Marker, MarkerContent } from "@vpf/ui/components/marker"

export default function BubbleReactionsDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-12">
      <Marker variant="separator">
        <MarkerContent>side=bottom align=end</MarkerContent>
      </Marker>
      <Bubble>
        <BubbleContent>This is a one line message.</BubbleContent>
        <BubbleReactions
          side="bottom"
          align="end"
          role="img"
          aria-label="Reaction: thumbs up"
        >
          <span>👍</span>
        </BubbleReactions>
      </Bubble>
      <Bubble variant="tinted">
        <BubbleContent>
          A longer message that wraps across lines so the reaction offset is
          easier to inspect.
        </BubbleContent>
        <BubbleReactions
          side="bottom"
          align="end"
          role="img"
          aria-label="Reactions: thumbs up, surprised, fire, eyes, and 8 more"
        >
          <span>👍</span>
          <span>😮</span>
          <span>🔥</span>
          <span>👀</span>
          <span>+8</span>
        </BubbleReactions>
      </Bubble>
      <Marker variant="separator">
        <MarkerContent>side=bottom align=start</MarkerContent>
      </Marker>
      <Bubble variant="secondary">
        <BubbleContent>This is a one line message.</BubbleContent>
        <BubbleReactions
          side="bottom"
          align="start"
          role="img"
          aria-label="Reaction: fire"
        >
          <span>🔥</span>
        </BubbleReactions>
      </Bubble>
      <Marker variant="separator">
        <MarkerContent>side=top align=start</MarkerContent>
      </Marker>
      <Bubble variant="secondary">
        <BubbleContent>This is a one line message.</BubbleContent>
        <BubbleReactions
          side="top"
          align="start"
          role="img"
          aria-label="Reaction: fire"
        >
          <span>🔥</span>
        </BubbleReactions>
      </Bubble>
    </div>
  )
}
