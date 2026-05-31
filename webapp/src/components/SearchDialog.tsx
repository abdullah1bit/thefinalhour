import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, FileText, AlertTriangle, BookOpen, Clock } from "lucide-react";

interface SearchResult {
  type: "sign" | "major-sign" | "glossary" | "timeline";
  id: string;
  title: string;
  description: string;
  status: string | null;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const typeIcons: Record<string, React.ReactNode> = {
  sign: <FileText className="h-4 w-4 text-muted-foreground" />,
  "major-sign": <AlertTriangle className="h-4 w-4 text-muted-foreground" />,
  glossary: <BookOpen className="h-4 w-4 text-muted-foreground" />,
  timeline: <Clock className="h-4 w-4 text-muted-foreground" />,
};

const typeLabels: Record<string, string> = {
  sign: "Sign",
  "major-sign": "Major Sign",
  glossary: "Glossary",
  timeline: "Timeline",
};

export default function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: results, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () =>
      api.get<SearchResult[]>(`/api/search?q=${encodeURIComponent(query)}`),
    enabled: query.length >= 2,
    staleTime: 30_000,
  });

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg gap-0 p-0 overflow-hidden">
        <DialogTitle className="sr-only">Search</DialogTitle>
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search signs, glossary, timeline..."
            className="border-0 bg-transparent p-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {query.length < 2 ? (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">
              Type at least 2 characters to search
            </p>
          ) : isLoading ? (
            <div className="flex justify-center py-8">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : !results?.length ? (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">
              No results found
            </p>
          ) : (
            <div className="py-2">
              {results.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary/50"
                  onClick={() => onOpenChange(false)}
                >
                  <div className="mt-0.5 shrink-0">
                    {typeIcons[result.type]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-foreground truncate">
                        {result.title}
                      </span>
                      <span className="shrink-0 rounded bg-secondary px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                        {typeLabels[result.type]}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                      {result.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
