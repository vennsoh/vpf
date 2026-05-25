import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"

export default function InputFile() {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />
    </div>
  )
}
