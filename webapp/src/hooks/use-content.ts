import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type {
  HomepageData,
  Sign,
  MajorSign,
  GlossaryTerm,
  QuranicVerse,
  ScholarlyWork,
  TimelineEvent,
  Interpretation,
  AnnouncementBanner,
} from "@/lib/types";

export function useHomepageContent() {
  return useQuery({
    queryKey: ["homepage-content"],
    queryFn: () => api.get<HomepageData>("/api/content/homepage"),
    staleTime: 5 * 60 * 1000,
  });
}

export function useGlossaryTerms() {
  return useQuery({
    queryKey: ["glossary"],
    queryFn: () => api.get<GlossaryTerm[]>("/api/glossary"),
  });
}

export function useQuranicVerses() {
  return useQuery({
    queryKey: ["verses"],
    queryFn: () => api.get<QuranicVerse[]>("/api/verses"),
  });
}

export function useScholarlyWorks() {
  return useQuery({
    queryKey: ["scholarly-works"],
    queryFn: () => api.get<ScholarlyWork[]>("/api/scholarly-works"),
  });
}

export function useTimelineEvents() {
  return useQuery({
    queryKey: ["timeline"],
    queryFn: () => api.get<TimelineEvent[]>("/api/timeline"),
  });
}

export function useInterpretations() {
  return useQuery({
    queryKey: ["interpretations"],
    queryFn: () => api.get<Interpretation[]>("/api/interpretations"),
  });
}

export function useSigns(status?: string) {
  return useQuery({
    queryKey: ["signs", status],
    queryFn: () =>
      api.get<Sign[]>(`/api/signs${status ? `?status=${status}` : ""}`),
  });
}

export function useMajorSigns() {
  return useQuery({
    queryKey: ["major-signs"],
    queryFn: () => api.get<MajorSign[]>("/api/major-signs"),
  });
}

export function useBanners() {
  return useQuery({
    queryKey: ["banners"],
    queryFn: () => api.get<AnnouncementBanner[]>("/api/admin/banners"),
  });
}

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: () => api.get<Record<string, string>>("/api/admin/settings"),
  });
}
