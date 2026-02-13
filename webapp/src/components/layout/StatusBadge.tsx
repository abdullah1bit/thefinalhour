import { cn } from "@/lib/utils";
import type { SignStatus } from "@/data/types";

interface StatusBadgeProps {
  status: SignStatus;
  label?: string;
}

const statusConfig: Record<SignStatus, { dot: string; bg: string; text: string; defaultLabel: string }> = {
  fulfilled: {
    dot: "bg-fulfilled",
    bg: "bg-fulfilled/10 border-fulfilled/30",
    text: "text-fulfilled",
    defaultLabel: "Fulfilled",
  },
  unfolding: {
    dot: "bg-unfolding",
    bg: "bg-unfolding/10 border-unfolding/30",
    text: "text-unfolding",
    defaultLabel: "Unfolding",
  },
  approaching: {
    dot: "bg-approaching",
    bg: "bg-approaching/10 border-approaching/30",
    text: "text-approaching",
    defaultLabel: "Approaching",
  },
};

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-body font-medium",
        config.bg,
        config.text
      )}
    >
      <span className={cn("h-2 w-2 rounded-full", config.dot)} />
      {label ?? config.defaultLabel}
    </span>
  );
}
