import { Bubble, BubbleContent } from "@vpf/ui/components/bubble"

export default function BubbleDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <Bubble>
        <BubbleContent>
          Default bubbles use the primary color for the active user side of a
          chat.
        </BubbleContent>
      </Bubble>
      <Bubble variant="secondary">
        <BubbleContent>
          Secondary bubbles are the standard neutral surface for assistant and
          conversation content.
        </BubbleContent>
      </Bubble>
      <Bubble variant="muted">
        <BubbleContent>
          Muted bubbles lower the emphasis for quiet system notes or for
          displaying supporting content.
        </BubbleContent>
      </Bubble>
      <Bubble variant="tinted" align="end">
        <BubbleContent>
          Tinted bubbles use a softer primary tint when primary fill is too
          strong.
        </BubbleContent>
      </Bubble>
      <Bubble variant="outline">
        <BubbleContent>
          Outline bubbles can be used to frame message content and give it a
          border.
        </BubbleContent>
      </Bubble>
      <Bubble variant="destructive">
        <BubbleContent>
          Destructive bubbles flag errors or failed actions in a conversation.
        </BubbleContent>
      </Bubble>
      <Bubble variant="ghost">
        <BubbleContent>
          Ghost bubbles work for assistant text and other content that should
          not be framed. They are full width and can take the full width of the
          container.
        </BubbleContent>
      </Bubble>
    </div>
  )
}
