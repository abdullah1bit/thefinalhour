import { cn } from "@/lib/utils";

interface SectionDividerProps {
  label?: string;
  className?: string;
}

export default function SectionDivider({ label, className }: SectionDividerProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3 py-8", className)}>
      {label ? (
        <span className="font-heading text-sm font-medium tracking-widest uppercase text-muted-foreground">
          {label}
        </span>
      ) : null}
      <div className="flex w-full items-center gap-3">
        <div className="h-px flex-1 bg-primary/20" />
        <div className="h-2.5 w-2.5 rotate-45 border border-primary/40 bg-primary/10" />
        <div className="h-px flex-1 bg-primary/20" />
      </div>
    </div>
  );
}
