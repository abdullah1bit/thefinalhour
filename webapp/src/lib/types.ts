export type SignStatus = "fulfilled" | "unfolding" | "approaching";

export interface Sign {
  id: string;
  slug: string;
  title: string;
  description: string;
  source: string;
  status: SignStatus;
  category: string | null;
  period: string | null;
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
  details: MajorSignDetail[];
  sortOrder: number;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  arabic: string | null;
  definition: string;
  sortOrder: number;
}

export interface QuranicVerse {
  id: string;
  reference: string;
  text: string;
  context: string | null;
  sortOrder: number;
}

export interface ScholarlyWork {
  id: string;
  title: string;
  author: string;
  deathDate: string;
  sortOrder: number;
}

export interface TimelineEvent {
  id: string;
  slug: string;
  title: string;
  status: SignStatus;
  description: string;
  sortOrder: number;
}

export interface Interpretation {
  id: string;
  prophecy: string;
  modernInterpretation: string;
  scholarlyCaution: string;
  sortOrder: number;
}

export interface HomepageData {
  fulfilledSigns: Sign[];
  unfoldingSigns: Sign[];
  majorSigns: MajorSign[];
  interpretations: Interpretation[];
  featuredVerse: QuranicVerse | null;
}
