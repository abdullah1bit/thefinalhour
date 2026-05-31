import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BookOpen, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MajorSign, ImageSettings } from "@/lib/types";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

interface MajorSignCardProps {
  sign: MajorSign;
}

export default function MajorSignCard({ sign }: MajorSignCardProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const imgSettings: ImageSettings | null = sign.imageSettings
    ? JSON.parse(sign.imageSettings)
    : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-lg border border-border/50 bg-card transition-colors duration-300 hover:border-approaching/30"
    >
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-approaching/40" />

      {/* Clickable header */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-start gap-4 p-5 text-left md:p-6"
      >
        {/* Number badge */}
        <div className="flex-shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-approaching/40 bg-approaching/10 md:h-12 md:w-12">
            <span className="font-heading text-lg font-bold text-approaching md:text-xl">
              {sign.number}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-1">
            <h3 className="font-heading text-xl font-bold leading-tight tracking-wide text-foreground md:text-2xl">
              {sign.title}
            </h3>
            <span className="font-arabic text-base text-approaching/80 md:text-lg">
              {sign.arabicTitle}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {sign.subtitle}
            </span>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            {sign.description}
          </p>
        </div>

        {/* Expand chevron */}
        <div className="flex-shrink-0 pt-1">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-approaching" />
          </motion.div>
        </div>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/40 px-5 pb-5 pt-4 md:px-6 md:pb-6">
              {/* Image */}
              {sign.imageUrl ? (
                <div
                  className="mb-4 w-full overflow-hidden rounded-md"
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

              {/* Details grid */}
              <div className="space-y-4">
                {sign.details.map((detail) => (
                  <div key={detail.label} className="flex flex-col gap-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-approaching/70">
                      {detail.label}
                    </span>
                    <p className="text-sm leading-relaxed text-foreground/80">
                      {detail.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Sources */}
              <div className="mt-6 border-t border-border/30 pt-4">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span className="font-semibold uppercase tracking-wider">Sources</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {sign.sources.map((source) => (
                    <span
                      key={source}
                      className={cn(
                        "rounded-md border border-border/50 bg-secondary/50 px-2.5 py-1 text-xs text-muted-foreground"
                      )}
                    >
                      {source}
                    </span>
                  ))}
                </div>
                {sign.sourceUrl ? (
                  <a
                    href={sign.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs text-primary/80 hover:text-primary transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {sign.sourceLabel || "Read more"}
                  </a>
                ) : null}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}
