import type { ScholarlyWork } from "@/data/types";

interface ScholarlyWorkCardProps {
  work: ScholarlyWork;
}

export default function ScholarlyWorkCard({ work }: ScholarlyWorkCardProps) {
  return (
    <div className="group rounded-lg border border-border/60 bg-card/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card">
      <h3 className="font-heading text-base font-semibold text-foreground">
        {work.title}
      </h3>
      <p className="mt-1.5 font-body text-sm text-muted-foreground">
        {work.author}
      </p>
      <p className="mt-1 font-body text-xs text-muted-foreground/70">
        {work.deathDate}
      </p>
    </div>
  );
}
