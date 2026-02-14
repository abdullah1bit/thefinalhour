import { useState } from "react";
import { X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AnnouncementBanner } from "@/lib/types";

const variantStyles: Record<string, { bg: string; border: string; text: string; link: string }> = {
  default: {
    bg: "bg-primary/10",
    border: "border-primary/20",
    text: "text-primary/90",
    link: "text-primary hover:text-primary/70",
  },
  warning: {
    bg: "bg-approaching/10",
    border: "border-approaching/20",
    text: "text-approaching/90",
    link: "text-approaching hover:text-approaching/70",
  },
  success: {
    bg: "bg-fulfilled/10",
    border: "border-fulfilled/20",
    text: "text-fulfilled/90",
    link: "text-fulfilled hover:text-fulfilled/70",
  },
  donation: {
    bg: "bg-unfolding/10",
    border: "border-unfolding/20",
    text: "text-unfolding/90",
    link: "text-unfolding hover:text-unfolding/70",
  },
};

interface Props {
  banners: AnnouncementBanner[];
}

export default function AnnouncementBar({ banners }: Props) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const visible = banners.filter((b) => !dismissed.has(b.id));
  if (visible.length === 0) return null;

  const dismiss = (id: string) => {
    setDismissed((prev) => new Set(prev).add(id));
  };

  return (
    <div className="w-full">
      {visible.map((banner) => {
        const style = variantStyles[banner.variant] || variantStyles.default;
        return (
          <div
            key={banner.id}
            className={cn("relative border-b px-4 py-2.5", style.bg, style.border)}
          >
            <div className="mx-auto flex max-w-5xl items-center justify-center gap-2 text-center">
              <p className={cn("text-sm font-body", style.text)}>
                {banner.message}
                {banner.linkText && banner.linkUrl ? (
                  <a
                    href={banner.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "ml-2 inline-flex items-center gap-1 underline underline-offset-2 font-medium",
                      style.link
                    )}
                  >
                    {banner.linkText}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : null}
              </p>
              <button
                type="button"
                onClick={() => dismiss(banner.id)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                aria-label="Dismiss"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
