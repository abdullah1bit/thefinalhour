import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Sign } from "@/lib/types";

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

  return (
    <div className={cn("rounded-lg border bg-card/60 transition-colors", colors.border)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        <div className={cn("h-2 w-2 rounded-full flex-shrink-0", colors.dot)} />
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-medium text-foreground leading-snug">
            {sign.title}
          </h4>
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
              <p className="text-sm leading-relaxed text-muted-foreground">
                {sign.description}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
