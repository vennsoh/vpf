import {
  IconFileCode,
  IconFileText,
  IconTable,
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

export default function AttachmentDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Attachment className="w-full">
        <AttachmentMedia>
          <IconFileText />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
          <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove sales-dashboard.pdf">
            <IconX />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment className="w-full">
        <AttachmentMedia>
          <IconTable />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>customer-import.csv</AttachmentTitle>
          <AttachmentDescription>CSV · 18 KB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove customer-import.csv">
            <IconX />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment className="w-full">
        <AttachmentMedia>
          <IconFileCode />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>registry-schema.ts</AttachmentTitle>
          <AttachmentDescription>TS · 6 KB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove registry-schema.ts">
            <IconX />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </div>
  )
}
