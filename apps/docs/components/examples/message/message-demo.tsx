import { Bubble, BubbleContent } from "@vpf/ui/components/bubble"
import {
  Message,
  MessageContent,
  MessageGroup,
} from "@vpf/ui/components/message"

export default function MessageDemo() {
  return (
    <MessageGroup className="w-full max-w-md">
      <Message>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>Something went wrong. Any idea?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>
              I checked the latest deployment and found the build failed during
              dependency installation.
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>Can you retry it with a clean cache?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageGroup>
  )
}
