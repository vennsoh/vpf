import { Avatar, AvatarFallback, AvatarImage } from "@vpf/ui/components/avatar"
import { Bubble, BubbleContent } from "@vpf/ui/components/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@vpf/ui/components/message"

export default function MessageAvatarDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-10">
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="grayscale"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>Something went wrong. Any idea?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </MessageAvatar>
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
        <MessageAvatar>
          <Avatar>
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble>
            <BubbleContent>Retrying with a clean cache now.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </div>
  )
}
