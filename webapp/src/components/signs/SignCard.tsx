import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Sign } from "@/lib/types";

interface SignCardProps {
  sign: Sign;
  index?: number;
}

const statusBorderMap: Record<string, string> = {
  fulfilled: "border-l-fulfilled",
  unfolding: "border-l-unfolding",
  approaching: "border-l-approaching",
};

const statusDotMap: Record<string, string> = {
  fulfilled: "bg-fulfilled",
  unfolding: "bg-unfolding",
  approaching: "bg-approaching",
};

const statusBgMap: Record<string, string> = {
  fulfilled: "bg-fulfilled/10",
  unfolding: "bg-unfolding/10",
  approaching: "bg-approaching/10",
};

export default function SignCard({ sign, index = 0 }: SignCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -2 }}
      className={cn(
        "group relative rounded-lg border border-border/50 border-l-4 bg-card/60 p-5 transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/5 md:p-6",
        statusBorderMap[sign.status] ?? "border-l-primary"
      )}
    >
      {/* Subtle background accent on hover */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          statusBgMap[sign.status]
        )}
      />

      <div className="relative flex items-start gap-3">
        {/* Status dot */}
        <span
          className={cn(
            "mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full",
            statusDotMap[sign.status] ?? "bg-primary"
          )}
        />

        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="font-heading text-lg font-semibold leading-snug text-foreground md:text-xl">
            {sign.title}
          </h3>

          {/* Description */}
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {sign.description}
          </p>

          {/* Source */}
          <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground/70">
            <BookOpen className="h-3.5 w-3.5" />
            <span className="font-body">{sign.source}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
