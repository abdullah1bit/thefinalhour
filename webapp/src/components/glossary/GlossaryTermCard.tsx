import { cn } from "@/lib/utils";
import type { GlossaryTerm } from "@/data/types";

interface GlossaryTermCardProps {
  term: GlossaryTerm;
}

export default function GlossaryTermCard({ term }: GlossaryTermCardProps) {
  return (
    <div
      className={cn(
        "group rounded-lg border border-border/60 bg-card/60 p-4 backdrop-blur-sm",
        "transition-all duration-300 hover:border-primary/30 hover:bg-card"
      )}
    >
      {term.arabic ? (
        <p className="mb-1 font-arabic text-xl leading-relaxed text-primary/80 text-right">
          {term.arabic}
        </p>
      ) : null}

      <h3 className="font-heading text-base font-semibold text-foreground">
        {term.term}
      </h3>

      <p className="mt-1.5 font-body text-sm leading-relaxed text-muted-foreground">
        {term.definition}
      </p>
    </div>
  );
}
