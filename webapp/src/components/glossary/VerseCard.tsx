import { ExternalLink } from "lucide-react";
import type { QuranicVerse } from "@/lib/types";

interface VerseCardProps {
  verse: QuranicVerse;
}

export default function VerseCard({ verse }: VerseCardProps) {
  return (
    <div className="group rounded-lg border border-border/60 bg-card/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card">
      {/* Reference */}
      <span className="font-body text-xs font-semibold tracking-wider uppercase text-primary">
        Surah {verse.reference}
      </span>

      {/* Verse text */}
      <blockquote className="mt-3 font-heading text-base italic leading-relaxed text-foreground/90">
        &ldquo;{verse.text}&rdquo;
      </blockquote>

      {/* Context */}
      {verse.context ? (
        <p className="mt-3 font-body text-xs leading-relaxed text-muted-foreground">
          {verse.context}
        </p>
      ) : null}

      {verse.sourceUrl ? (
        <a
          href={verse.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-xs text-primary/80 hover:text-primary transition-colors"
        >
          <ExternalLink className="h-3 w-3" />
          {verse.sourceLabel || "Read more"}
        </a>
      ) : null}
    </div>
  );
}
