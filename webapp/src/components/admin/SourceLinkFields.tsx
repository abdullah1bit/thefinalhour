import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExternalLink } from "lucide-react";

interface SourceLinkFieldsProps {
  sourceLabel: string;
  sourceUrl: string;
  onSourceLabelChange: (value: string) => void;
  onSourceUrlChange: (value: string) => void;
}

export default function SourceLinkFields({
  sourceLabel,
  sourceUrl,
  onSourceLabelChange,
  onSourceUrlChange,
}: SourceLinkFieldsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <ExternalLink className="h-4 w-4 text-muted-foreground" />
        <Label className="text-sm font-medium">Source Link (optional)</Label>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label htmlFor="sourceLabel" className="text-xs text-muted-foreground">
            Link Text
          </Label>
          <Input
            id="sourceLabel"
            value={sourceLabel}
            onChange={(e) => onSourceLabelChange(e.target.value)}
            placeholder="Read more"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="sourceUrl" className="text-xs text-muted-foreground">
            URL
          </Label>
          <Input
            id="sourceUrl"
            value={sourceUrl}
            onChange={(e) => onSourceUrlChange(e.target.value)}
            placeholder="https://..."
            type="url"
          />
        </div>
      </div>
    </div>
  );
}
