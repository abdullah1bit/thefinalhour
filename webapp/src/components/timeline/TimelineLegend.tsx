import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const legendItems = [
  { label: "Fulfilled", dotClass: "bg-fulfilled", textClass: "text-fulfilled" },
  { label: "Unfolding", dotClass: "bg-unfolding", textClass: "text-unfolding" },
  { label: "Approaching", dotClass: "bg-approaching", textClass: "text-approaching" },
];

export default function TimelineLegend() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="mb-12 flex flex-wrap items-center justify-center gap-6 rounded-lg border border-border/50 bg-card/50 px-6 py-4 backdrop-blur-sm"
    >
      <span className="font-body text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Legend
      </span>
      <div className="h-4 w-px bg-border/40" />
      {legendItems.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span
            className={cn(
              "h-2.5 w-2.5 rounded-full",
              item.dotClass
            )}
          />
          <span className={cn("font-body text-sm", item.textClass)}>
            {item.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
