import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface CategoryOverviewCardProps {
  name: string;
  count: number;
  icon: LucideIcon;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

export default function CategoryOverviewCard({
  name,
  count,
  icon: Icon,
  description,
  isActive,
  onClick,
}: CategoryOverviewCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group flex flex-col items-start gap-2 rounded-lg border p-4 text-left transition-all duration-300",
        isActive
          ? "border-unfolding/50 bg-unfolding/10 shadow-md shadow-primary/5"
          : "border-border/50 bg-card hover:border-border hover:bg-secondary/50"
      )}
    >
      <div className="flex w-full items-center justify-between">
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-md transition-colors duration-300",
            isActive
              ? "bg-unfolding/20 text-unfolding"
              : "bg-secondary text-muted-foreground group-hover:text-foreground"
          )}
        >
          <Icon className="h-4.5 w-4.5" />
        </div>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums",
            isActive
              ? "bg-unfolding/20 text-unfolding"
              : "bg-secondary text-muted-foreground"
          )}
        >
          {count}
        </span>
      </div>

      <div>
        <h3
          className={cn(
            "font-heading text-sm font-semibold leading-tight",
            isActive ? "text-unfolding" : "text-foreground"
          )}
        >
          {name}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </motion.button>
  );
}
