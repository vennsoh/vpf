"use client"

import { Bubble, BubbleContent } from "@vpf/ui/components/bubble"
import { Marker, MarkerContent } from "@vpf/ui/components/marker"
import { Message, MessageContent } from "@vpf/ui/components/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@vpf/ui/components/message-scroller"

const TRANSCRIPT = [
  {
    id: "1",
    from: "them",
    text: "Morning — did the nightly registry sync run?",
  },
  { id: "2", from: "me", text: "It did. Two new components landed." },
  { id: "3", from: "them", text: "Which ones?" },
  {
    id: "4",
    from: "me",
    text: "Attachment and Bubble. Both are Base UI ports.",
  },
  {
    id: "5",
    from: "them",
    text: "Nice. Did the lockfile stay clean, or did it pull the whole upgrade sweep along with it?",
  },
  { id: "6", from: "me", text: "Clean. Only the two new dependencies." },
  { id: "7", from: "them", text: "And the docs previews?" },
  {
    id: "8",
    from: "me",
    text: "Generated. Every new component has a demo page now, so you can scroll through them the same way you would any other primitive.",
  },
  { id: "9", from: "them", text: "Perfect. Ship it." },
] as const

export default function MessageScrollerDemo() {
  return (
    <MessageScrollerProvider>
      <MessageScroller className="h-80 w-full max-w-md rounded-lg border">
        <MessageScrollerViewport className="p-4">
          <MessageScrollerContent className="gap-4">
            <MessageScrollerItem>
              <Marker variant="separator">
                <MarkerContent>Today</MarkerContent>
              </Marker>
            </MessageScrollerItem>
            {TRANSCRIPT.map((entry, index) => (
              <MessageScrollerItem
                key={entry.id}
                scrollAnchor={index === TRANSCRIPT.length - 1}
              >
                <Message align={entry.from === "me" ? "end" : "start"}>
                  <MessageContent>
                    <Bubble
                      variant={entry.from === "me" ? "default" : "muted"}
                      align={entry.from === "me" ? "end" : "start"}
                    >
                      <BubbleContent>{entry.text}</BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              </MessageScrollerItem>
            ))}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton direction="end" />
      </MessageScroller>
    </MessageScrollerProvider>
  )
}
