export type SignStatus = "fulfilled" | "unfolding" | "approaching";

export interface ImageSettings {
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  aspectRatio?: string;
  size?: "sm" | "md" | "lg";
}

export interface Sign {
  id: string;
  slug: string;
  title: string;
  description: string;
  source: string;
  status: SignStatus;
  category: string | null;
  period: string | null;
  sourceUrl: string | null;
  sourceLabel: string | null;
  imageUrl: string | null;
  imageSettings: string | null;
  sortOrder: number;
}

export interface MajorSignDetail {
  id: string;
  label: string;
  content: string;
  sortOrder: number;
}

export interface MajorSign {
  id: string;
  slug: string;
  number: number;
  title: string;
  arabicTitle: string;
  subtitle: string;
  description: string;
  sources: string[];
  sourceUrl: string | null;
  sourceLabel: string | null;
  imageUrl: string | null;
  imageSettings: string | null;
  details: MajorSignDetail[];
  sortOrder: number;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  arabic: string | null;
  definition: string;
  sourceUrl: string | null;
  sourceLabel: string | null;
  sortOrder: number;
}

export interface QuranicVerse {
  id: string;
  reference: string;
  text: string;
  context: string | null;
  sourceUrl: string | null;
  sourceLabel: string | null;
  sortOrder: number;
}

export interface ScholarlyWork {
  id: string;
  title: string;
  author: string;
  deathDate: string;
  sourceUrl: string | null;
  sourceLabel: string | null;
  sortOrder: number;
}

export interface TimelineEvent {
  id: string;
  slug: string;
  title: string;
  status: SignStatus;
  description: string;
  sourceUrl: string | null;
  sourceLabel: string | null;
  imageUrl: string | null;
  imageSettings: string | null;
  sortOrder: number;
}

export interface Interpretation {
  id: string;
  prophecy: string;
  modernInterpretation: string;
  scholarlyCaution: string;
  sourceUrl: string | null;
  sourceLabel: string | null;
  sortOrder: number;
}

export type BannerVariant = "default" | "warning" | "success" | "donation";

export interface AnnouncementBanner {
  id: string;
  message: string;
  linkText: string | null;
  linkUrl: string | null;
  variant: BannerVariant;
  enabled: boolean;
  sortOrder: number;
}

export interface HomepageData {
  fulfilledSigns: Sign[];
  unfoldingSigns: Sign[];
  approachingSigns: Sign[];
  majorSigns: MajorSign[];
  interpretations: Interpretation[];
  featuredVerse: QuranicVerse | null;
  banners: AnnouncementBanner[];
  settings: Record<string, string>;
}
