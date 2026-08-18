/* eslint-disable @next/next/no-img-element */
import { IconFileText, IconX } from "@tabler/icons-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@vpf/ui/components/attachment"

export default function AttachmentGroupDemo() {
  return (
    <AttachmentGroup className="w-full max-w-md">
      <Attachment className="w-64">
        <AttachmentMedia>
          <IconFileText />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>briefing-notes.pdf</AttachmentTitle>
          <AttachmentDescription>PDF · 1.4 MB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove briefing-notes.pdf">
            <IconX />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment className="w-64">
        <AttachmentMedia variant="image">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
            alt="Workspace"
          />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>workspace.png</AttachmentTitle>
          <AttachmentDescription>PNG · 820 KB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove workspace.png">
            <IconX />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment className="w-64">
        <AttachmentMedia>
          <IconFileText />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>launch-checklist.md</AttachmentTitle>
          <AttachmentDescription>MD · 12 KB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove launch-checklist.md">
            <IconX />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </AttachmentGroup>
  )
}
