import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Sign, ImageSettings } from "@/lib/types";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

const statusColors: Record<string, { dot: string; border: string; bg: string }> = {
  fulfilled: {
    dot: "bg-fulfilled",
    border: "border-fulfilled/30",
    bg: "bg-fulfilled/5",
  },
  unfolding: {
    dot: "bg-unfolding",
    border: "border-unfolding/30",
    bg: "bg-unfolding/5",
  },
  approaching: {
    dot: "bg-approaching",
    border: "border-approaching/30",
    bg: "bg-approaching/5",
  },
};

export default function ExpandableSignCard({ sign }: { sign: Sign }) {
  const [open, setOpen] = useState(false);
  const colors = statusColors[sign.status] || statusColors.fulfilled;
  const imgSettings: ImageSettings | null = sign.imageSettings
    ? JSON.parse(sign.imageSettings)
    : null;

  return (
    <article className={cn("rounded-lg border bg-card/60 transition-colors", colors.border)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        <div className={cn("h-2 w-2 rounded-full flex-shrink-0", colors.dot)} />
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium text-foreground leading-snug">
            {sign.title}
          </h3>
          <span className="text-xs text-muted-foreground">{sign.source}</span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/30 px-4 pb-4 pt-3">
              {sign.imageUrl ? (
                <div
                  className="mb-3 w-full overflow-hidden rounded-md"
                  style={{
                    height: imgSettings?.size === "sm" ? "120px" : imgSettings?.size === "lg" ? "260px" : "180px",
                  }}
                >
                  <img
                    src={sign.imageUrl.startsWith("http") ? sign.imageUrl : `${API_BASE}${sign.imageUrl}`}
                    alt={sign.title}
                    loading="lazy"
                    className="h-full w-full"
                    style={{
                      objectFit: (imgSettings?.objectFit || "cover") as "cover" | "contain",
                      objectPosition: imgSettings?.objectPosition || "center",
                    }}
                  />
                </div>
              ) : null}
              <p className="text-sm leading-relaxed text-muted-foreground">
                {sign.description}
              </p>
              {sign.sourceUrl ? (
                <a
                  href={sign.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs text-primary/80 hover:text-primary transition-colors"
                >
                  <ExternalLink className="h-3 w-3" />
                  {sign.sourceLabel || "Read more"}
                </a>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
