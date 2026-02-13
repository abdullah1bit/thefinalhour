import { BookOpen, Lightbulb, AlertCircle } from "lucide-react";
import type { Interpretation } from "@/data/types";

interface InterpretationCardProps {
  interpretation: Interpretation;
  index: number;
}

export default function InterpretationCard({ interpretation, index }: InterpretationCardProps) {
  return (
    <div className="group rounded-lg border border-border/60 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:bg-card overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center gap-2 border-b border-border/40 bg-card/80 px-5 py-3">
        <span className="font-body text-xs font-semibold tabular-nums text-primary/50">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-heading text-sm font-semibold text-foreground">
          {interpretation.prophecy}
        </span>
      </div>

      <div className="grid gap-4 p-5 md:grid-cols-3">
        {/* Prophecy */}
        <div className="flex gap-3">
          <BookOpen className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary/60" />
          <div>
            <span className="font-body text-xs font-medium uppercase tracking-wider text-primary/70">
              Prophecy
            </span>
            <p className="mt-1 font-body text-sm leading-relaxed text-foreground/90">
              {interpretation.prophecy}
            </p>
          </div>
        </div>

        {/* Modern Interpretation */}
        <div className="flex gap-3">
          <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-unfolding/70" />
          <div>
            <span className="font-body text-xs font-medium uppercase tracking-wider text-unfolding/70">
              Modern Interpretation
            </span>
            <p className="mt-1 font-body text-sm leading-relaxed text-foreground/90">
              {interpretation.modernInterpretation}
            </p>
          </div>
        </div>

        {/* Scholarly Caution */}
        <div className="flex gap-3">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-approaching/70" />
          <div>
            <span className="font-body text-xs font-medium uppercase tracking-wider text-approaching/70">
              Scholarly Caution
            </span>
            <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">
              {interpretation.scholarlyCaution}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
