import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TimelineEvent, ImageSettings } from "@/lib/types";
import StatusBadge from "@/components/layout/StatusBadge";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

interface TimelineNodeProps {
  event: TimelineEvent;
  index: number;
  isLast: boolean;
}

const statusDotColor: Record<string, string> = {
  fulfilled: "bg-fulfilled border-fulfilled shadow-[0_0_12px_hsl(145_60%_40%/0.4)]",
  unfolding: "bg-unfolding border-unfolding shadow-[0_0_12px_hsl(43_80%_55%/0.4)]",
  approaching: "bg-approaching border-approaching shadow-[0_0_12px_hsl(0_65%_50%/0.4)]",
};

const statusLineColor: Record<string, string> = {
  fulfilled: "bg-fulfilled/40",
  unfolding: "bg-primary/30",
  approaching: "bg-approaching/20",
};

export default function TimelineNode({ event, index, isLast }: TimelineNodeProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative"
    >
      {/* Desktop: alternating left/right layout */}
      <div className="flex items-start">
        {/* Left content area (desktop only) */}
        <div className="hidden md:flex md:w-[calc(50%-24px)] md:justify-end">
          {isEven ? (
            <TimelineCard event={event} index={index} alignment="right" />
          ) : (
            <div />
          )}
        </div>

        {/* Center line and dot */}
        <div className="relative flex flex-col items-center mx-4 md:mx-6">
          {/* Dot */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 200 }}
            className={cn(
              "relative z-10 h-4 w-4 rounded-full border-2",
              statusDotColor[event.status]
            )}
          />

          {/* Connecting line below */}
          {!isLast ? (
            <div
              className={cn(
                "w-px flex-1 min-h-[40px]",
                statusLineColor[event.status]
              )}
            />
          ) : null}
        </div>

        {/* Right content area (desktop only) */}
        <div className="hidden md:flex md:w-[calc(50%-24px)]">
          {!isEven ? (
            <TimelineCard event={event} index={index} alignment="left" />
          ) : (
            <div />
          )}
        </div>

        {/* Mobile content (always on the right) */}
        <div className="flex-1 md:hidden pb-8">
          <TimelineCard event={event} index={index} alignment="left" />
        </div>
      </div>
    </motion.div>
  );
}

interface TimelineCardProps {
  event: TimelineEvent;
  index: number;
  alignment: "left" | "right";
}

function TimelineCard({ event, index, alignment }: TimelineCardProps) {
  const imgSettings: ImageSettings | null = event.imageSettings
    ? JSON.parse(event.imageSettings)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: alignment === "left" ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className={cn(
        "group relative w-full max-w-sm rounded-lg border border-border/60 bg-card/80 overflow-hidden backdrop-blur-sm",
        "transition-all duration-300 hover:border-primary/30 hover:bg-card",
        alignment === "right" ? "md:text-right" : "md:text-left"
      )}
    >
      {/* Banner image */}
      {event.imageUrl ? (
        <div
          className="overflow-hidden"
          style={{
            aspectRatio: imgSettings?.aspectRatio || "16/9",
            maxHeight: "160px",
          }}
        >
          <img
            src={event.imageUrl.startsWith("http") ? event.imageUrl : `${API_BASE}${event.imageUrl}`}
            alt={event.title}
            className="h-full w-full"
            style={{
              objectFit: (imgSettings?.objectFit || "cover") as "cover" | "contain",
              objectPosition: imgSettings?.objectPosition || "center",
            }}
          />
        </div>
      ) : null}

      <div className="p-4">
        {/* Subtle connector line to dot (desktop only) */}
        <div
          className={cn(
            "absolute top-[18px] hidden h-px w-6 bg-border/40 md:block",
            alignment === "left" ? "-left-6" : "-right-6"
          )}
        />

        <div className={cn(
          "flex items-center gap-2 mb-2",
          alignment === "right" ? "md:flex-row-reverse" : ""
        )}>
          <span className="font-body text-xs text-muted-foreground tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <StatusBadge status={event.status} />
        </div>

        <h3 className="font-heading text-lg font-semibold text-foreground leading-tight">
          {event.title}
        </h3>

        <p className="mt-1.5 font-body text-sm leading-relaxed text-muted-foreground">
          {event.description}
        </p>

        {event.sourceUrl ? (
          <a
            href={event.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-xs text-primary/80 hover:text-primary transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            {event.sourceLabel || "Read more"}
          </a>
        ) : null}
      </div>

      {/* Decorative accent line */}
      <div
        className={cn(
          "absolute bottom-0 h-0.5 w-0 rounded-full bg-primary/40 transition-all duration-500 group-hover:w-12",
          alignment === "right" ? "md:right-4" : "left-4"
        )}
      />
    </motion.div>
  );
}
