import type {
  AnnouncementBanner,
  GlossaryTerm,
  HomepageData,
  Interpretation,
  MajorSign,
  QuranicVerse,
  ScholarlyWork,
  Sign,
  SignStatus,
  TimelineEvent,
} from "./types";

export const SITE_URL =
  import.meta.env.PUBLIC_SITE_URL || "https://thefinalhour.vercel.app";

const BUILD_BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

interface ApiResponse<T> {
  data: T;
}

export interface PublicContent {
  homepage: HomepageData;
  signs: Sign[];
  majorSigns: MajorSign[];
  timeline: TimelineEvent[];
  glossary: GlossaryTerm[];
  verses: QuranicVerse[];
  scholarlyWorks: ScholarlyWork[];
  interpretations: Interpretation[];
}

export interface SearchRecord {
  id: string;
  type: "sign" | "major-sign" | "timeline" | "glossary" | "verse" | "scholarly-work";
  title: string;
  description: string;
  status: SignStatus | null;
  url: string;
  keywords: string;
}

async function apiGet<T>(endpoint: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${BUILD_BACKEND_URL}${endpoint}`);
  } catch (error) {
    throw new Error(
      `Could not reach backend content API at ${BUILD_BACKEND_URL}${endpoint}. Static Astro builds need VITE_BACKEND_URL set to the deployed backend, or a local backend running on port 3000.`
    );
  }

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${endpoint} from ${BUILD_BACKEND_URL}: ${response.status}`
    );
  }

  const json = (await response.json()) as ApiResponse<T>;
  return json.data;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function glossarySlug(term: GlossaryTerm): string {
  return `${slugify(term.term) || "term"}-${term.id.slice(0, 8)}`;
}

export function imageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  if (url.startsWith("/uploads")) return `${BUILD_BACKEND_URL}${url}`;
  return url;
}

export async function getPublicContent(): Promise<PublicContent> {
  const [
    homepage,
    signs,
    majorSigns,
    timeline,
    glossary,
    verses,
    scholarlyWorks,
    interpretations,
  ] = await Promise.all([
    apiGet<HomepageData>("/api/content/homepage"),
    apiGet<Sign[]>("/api/signs"),
    apiGet<MajorSign[]>("/api/major-signs"),
    apiGet<TimelineEvent[]>("/api/timeline"),
    apiGet<GlossaryTerm[]>("/api/glossary"),
    apiGet<QuranicVerse[]>("/api/verses"),
    apiGet<ScholarlyWork[]>("/api/scholarly-works"),
    apiGet<Interpretation[]>("/api/interpretations"),
  ]);

  return {
    homepage: {
      ...homepage,
      fulfilledSigns: asArray(homepage.fulfilledSigns),
      unfoldingSigns: asArray(homepage.unfoldingSigns),
      approachingSigns: asArray(homepage.approachingSigns),
      majorSigns: asArray(homepage.majorSigns),
      interpretations: asArray(homepage.interpretations),
      banners: asArray(homepage.banners),
    },
    signs: asArray(signs),
    majorSigns: asArray(majorSigns),
    timeline: asArray(timeline),
    glossary: asArray(glossary),
    verses: asArray(verses),
    scholarlyWorks: asArray(scholarlyWorks),
    interpretations: asArray(interpretations),
  };
}

function asArray<T>(value: T[] | T): T[] {
  return Array.isArray(value) ? value : [value];
}

export function buildSearchRecords(content: PublicContent): SearchRecord[] {
  return [
    ...content.signs.map((sign) => ({
      id: sign.id,
      type: "sign" as const,
      title: sign.title,
      description: sign.description,
      status: sign.status,
      url: `/signs/${sign.slug}/`,
      keywords: [sign.source, sign.category, sign.period].filter(Boolean).join(" "),
    })),
    ...content.majorSigns.map((sign) => ({
      id: sign.id,
      type: "major-sign" as const,
      title: sign.title,
      description: sign.description,
      status: null,
      url: `/major-signs/${sign.slug}/`,
      keywords: [sign.arabicTitle, sign.subtitle, ...sign.sources].join(" "),
    })),
    ...content.timeline.map((event) => ({
      id: event.id,
      type: "timeline" as const,
      title: event.title,
      description: event.description,
      status: event.status,
      url: `/timeline/${event.slug}/`,
      keywords: event.sourceLabel || "",
    })),
    ...content.glossary.map((term) => ({
      id: term.id,
      type: "glossary" as const,
      title: term.term,
      description: term.definition,
      status: null,
      url: `/glossary/${glossarySlug(term)}/`,
      keywords: term.arabic || "",
    })),
    ...content.verses.map((verse) => ({
      id: verse.id,
      type: "verse" as const,
      title: verse.reference,
      description: verse.text,
      status: null,
      url: `/references/#verse-${verse.id}`,
      keywords: verse.context || "",
    })),
    ...content.scholarlyWorks.map((work) => ({
      id: work.id,
      type: "scholarly-work" as const,
      title: work.title,
      description: `${work.author} ${work.deathDate}`,
      status: null,
      url: `/references/#work-${work.id}`,
      keywords: work.author,
    })),
  ];
}

export function groupSignsByStatus(signs: Sign[], status: SignStatus): Sign[] {
  return signs.filter((sign) => sign.status === status);
}

export function groupBy<T>(
  items: T[],
  getKey: (item: T) => string | null | undefined
): Record<string, T[]> {
  return items.reduce<Record<string, T[]>>((acc, item) => {
    const key = getKey(item) || "Other";
    acc[key] ||= [];
    acc[key].push(item);
    return acc;
  }, {});
}

export function pageDescription(text: string, max = 155): string {
  const compact = text.replace(/\s+/g, " ").trim();
  if (compact.length <= max) return compact;
  return `${compact.slice(0, max - 1).trim()}...`;
}

export type { AnnouncementBanner, GlossaryTerm, MajorSign, QuranicVerse, ScholarlyWork, Sign, TimelineEvent };
