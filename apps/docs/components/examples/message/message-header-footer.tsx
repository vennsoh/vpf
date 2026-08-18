import {
  Bubble,
  BubbleContent,
  BubbleReactions,
} from "@vpf/ui/components/bubble"
import { Button } from "@vpf/ui/components/button"
import {
  Message,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "@vpf/ui/components/message"

export default function MessageHeaderFooter() {
  return (
    <div className="flex w-full max-w-md flex-col gap-12">
      <Message align="end">
        <MessageContent>
          <MessageHeader className="justify-end">You</MessageHeader>
          <Bubble>
            <BubbleContent>
              Can we keep this style quiet and send the update today?
            </BubbleContent>
          </Bubble>
          <MessageFooter className="gap-2">
            <span>Delivered</span>
            <Button variant="ghost" size="xs">
              Undo
            </Button>
          </MessageFooter>
        </MessageContent>
      </Message>
      <Message align="start">
        <MessageContent>
          <MessageHeader>
            <span>Olivia</span>
            <span className="ml-auto font-normal">1m ago</span>
          </MessageHeader>
          <Bubble variant="muted">
            <BubbleContent>
              I checked the logs. The retry finished and the missing invoices
              are included now.
            </BubbleContent>
            <BubbleReactions>
              <Button variant="ghost" size="xs">
                Thanks
              </Button>
            </BubbleReactions>
          </Bubble>
          <MessageFooter className="gap-2">
            <span>From Support queue</span>
            <Button variant="ghost" size="xs">
              Copy
            </Button>
          </MessageFooter>
        </MessageContent>
      </Message>
    </div>
  )
}
