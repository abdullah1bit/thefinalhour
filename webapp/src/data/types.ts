export type SignStatus = "fulfilled" | "unfolding" | "approaching";

export interface Sign {
  id: string;
  title: string;
  description: string;
  source: string;
  status: SignStatus;
  category?: string;
  period?: string;
}

export interface MajorSign {
  id: string;
  number: number;
  title: string;
  arabicTitle: string;
  subtitle: string;
  description: string;
  details: MajorSignDetail[];
  sources: string[];
}

export interface MajorSignDetail {
  label: string;
  content: string;
}

export interface GlossaryTerm {
  term: string;
  arabic?: string;
  definition: string;
}

export interface QuranicVerse {
  reference: string;
  text: string;
  context?: string;
}

export interface ScholarlyWork {
  title: string;
  author: string;
  deathDate: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  status: SignStatus;
  description: string;
}

export interface Interpretation {
  prophecy: string;
  modernInterpretation: string;
  scholarlyCaution: string;
}
