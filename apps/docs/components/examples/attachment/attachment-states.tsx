import {
  IconAlertCircle,
  IconCheck,
  IconClock,
  IconX,
} from "@tabler/icons-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@vpf/ui/components/attachment"
import { Spinner } from "@vpf/ui/components/spinner"

export default function AttachmentStates() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Attachment state="idle" className="w-full">
        <AttachmentMedia>
          <IconClock />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>selected-file.pdf</AttachmentTitle>
          <AttachmentDescription>Ready to upload</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove selected-file.pdf">
            <IconX />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment state="uploading" className="w-full">
        <AttachmentMedia>
          <Spinner />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>design-system.zip</AttachmentTitle>
          <AttachmentDescription>Uploading · 64%</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove design-system.zip">
            <IconX />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment state="processing" className="w-full">
        <AttachmentMedia>
          <Spinner />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>quarterly-report.docx</AttachmentTitle>
          <AttachmentDescription>Processing</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="error" className="w-full">
        <AttachmentMedia>
          <IconAlertCircle />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>archive.tar.gz</AttachmentTitle>
          <AttachmentDescription>Upload failed</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove archive.tar.gz">
            <IconX />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment state="done" className="w-full">
        <AttachmentMedia>
          <IconCheck />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>brand-guidelines.pdf</AttachmentTitle>
          <AttachmentDescription>PDF · 4.1 MB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    </div>
  )
}
