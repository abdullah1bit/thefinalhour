import { useEffect, useMemo, useState } from "react";
import MiniSearch from "minisearch";

type SearchType =
  | "sign"
  | "major-sign"
  | "timeline"
  | "glossary"
  | "verse"
  | "scholarly-work";

interface SearchRecord {
  id: string;
  type: SearchType;
  title: string;
  description: string;
  status: string | null;
  url: string;
  keywords: string;
}

const typeLabels: Record<SearchType, string> = {
  sign: "Sign",
  "major-sign": "Major Sign",
  timeline: "Timeline",
  glossary: "Glossary",
  verse: "Verse",
  "scholarly-work": "Scholarly Work",
};

export default function SearchIsland() {
  const [records, setRecords] = useState<SearchRecord[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/search-index.json")
      .then((response) => {
        if (!response.ok) throw new Error("Search index failed to load.");
        return response.json();
      })
      .then((data: SearchRecord[]) => setRecords(data))
      .catch((err: Error) => setError(err.message));
  }, []);

  const miniSearch = useMemo(() => {
    const index = new MiniSearch<SearchRecord>({
      fields: ["title", "description", "keywords"],
      storeFields: ["id", "type", "title", "description", "status", "url"],
      searchOptions: {
        boost: { title: 3, keywords: 1.5 },
        fuzzy: 0.2,
        prefix: true,
      },
    });
    index.addAll(records);
    return index;
  }, [records]);

  const results = useMemo(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) return [];
    return miniSearch.search(trimmed).slice(0, 25);
  }, [miniSearch, query]);

  return (
    <div className="mx-auto max-w-3xl">
      <label className="sr-only" htmlFor="site-search">
        Search The Final Hour
      </label>
      <input
        id="site-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="w-full rounded-lg border border-border/60 bg-card/80 px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50"
        placeholder="Search signs, glossary, verses, timeline..."
        autoComplete="off"
      />

      <div className="mt-6 min-h-[220px] rounded-lg border border-border/50 bg-card/40">
        {error ? (
          <p className="px-4 py-8 text-center text-sm text-muted-foreground">{error}</p>
        ) : query.trim().length < 2 ? (
          <p className="px-4 py-8 text-center text-sm text-muted-foreground">
            Type at least 2 characters to search the static site index.
          </p>
        ) : results.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-muted-foreground">No results found.</p>
        ) : (
          <div className="divide-y divide-border/40">
            {results.map((result) => (
              <a
                key={`${result.type}-${result.id}`}
                href={String(result.url)}
                className="block px-4 py-4 transition-colors hover:bg-secondary/50"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-heading text-lg font-semibold text-foreground">
                    {String(result.title)}
                  </h2>
                  <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                    {typeLabels[result.type as SearchType]}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {String(result.description)}
                </p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
