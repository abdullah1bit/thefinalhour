import { useState, useRef } from "react";
import { api } from "@/lib/api";
import type { ImageSettings } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageIcon, Upload, X, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ImageUploadProps {
  imageUrl: string | null;
  imageSettings: ImageSettings | null;
  onImageUrlChange: (url: string | null) => void;
  onImageSettingsChange: (settings: ImageSettings | null) => void;
}

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

const SIZE_HEIGHTS: Record<string, string> = {
  sm: "120px",
  md: "180px",
  lg: "260px",
};

export default function ImageUpload({
  imageUrl,
  imageSettings,
  onImageUrlChange,
  onImageSettingsChange,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const settings = imageSettings || {
    objectFit: "cover" as const,
    objectPosition: "center",
    size: "md" as const,
  };

  const handleUpload = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large. Maximum size is 5MB.", variant: "destructive" });
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await api.raw("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.error?.message || "Upload failed");
      }
      const json = await response.json();
      onImageUrlChange(json.data.url);
      if (!imageSettings) {
        onImageSettingsChange({ objectFit: "cover", objectPosition: "center", size: "md" });
      }
      toast({ title: "Image uploaded" });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleRemove = () => {
    onImageUrlChange(null);
    onImageSettingsChange(null);
  };

  const updateSetting = (key: keyof ImageSettings, value: string) => {
    onImageSettingsChange({ ...settings, [key]: value });
  };

  const fullUrl = imageUrl ? (imageUrl.startsWith("http") ? imageUrl : `${API_BASE}${imageUrl}`) : null;
  const previewHeight = SIZE_HEIGHTS[settings.size || "md"] || SIZE_HEIGHTS.md;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <ImageIcon className="h-4 w-4 text-muted-foreground" />
        <Label className="text-sm font-medium">Image (optional)</Label>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
      />

      {!imageUrl ? (
        <Button
          type="button"
          variant="outline"
          className="w-full border-dashed"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Upload className="mr-2 h-4 w-4" />
          )}
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>
      ) : (
        <div className="space-y-3">
          {/* Preview */}
          <div className="relative group">
            <div
              className="w-full overflow-hidden rounded-md border border-border/50 bg-secondary/20"
              style={{ height: previewHeight }}
            >
              <img
                src={fullUrl!}
                alt="Preview"
                className="h-full w-full"
                style={{
                  objectFit: (settings.objectFit as "cover" | "contain") || "cover",
                  objectPosition: settings.objectPosition || "center",
                }}
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleRemove}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Settings controls */}
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Fit</Label>
              <Select
                value={settings.objectFit || "cover"}
                onValueChange={(v) => updateSetting("objectFit", v)}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cover">Cover</SelectItem>
                  <SelectItem value="contain">Contain</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Position</Label>
              <Select
                value={settings.objectPosition || "center"}
                onValueChange={(v) => updateSetting("objectPosition", v)}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="bottom">Bottom</SelectItem>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Size</Label>
              <Select
                value={settings.size || "md"}
                onValueChange={(v) => updateSetting("size", v)}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sm">Small</SelectItem>
                  <SelectItem value="md">Medium</SelectItem>
                  <SelectItem value="lg">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Replace button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <Loader2 className="mr-2 h-3 w-3 animate-spin" />
            ) : (
              <Upload className="mr-2 h-3 w-3" />
            )}
            Replace Image
          </Button>
        </div>
      )}
    </div>
  );
}
