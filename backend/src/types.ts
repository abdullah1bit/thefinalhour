import { z } from "zod";

// ─── Sign Schemas ─────────────────────────────────────────────────

export const SignSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  source: z.string(),
  status: z.string(),
  category: z.string().nullable(),
  period: z.string().nullable(),
  sourceUrl: z.string().nullable(),
  sourceLabel: z.string().nullable(),
  imageUrl: z.string().nullable(),
  imageSettings: z.string().nullable(),
  sortOrder: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CreateSignSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  source: z.string().min(1),
  status: z.string().min(1),
  category: z.string().nullable().optional(),
  period: z.string().nullable().optional(),
  sourceUrl: z.string().nullable().optional(),
  sourceLabel: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  imageSettings: z.string().nullable().optional(),
  sortOrder: z.number().optional().default(0),
});

export const UpdateSignSchema = CreateSignSchema.partial();

export type Sign = z.infer<typeof SignSchema>;
export type CreateSign = z.infer<typeof CreateSignSchema>;
export type UpdateSign = z.infer<typeof UpdateSignSchema>;

// ─── MajorSignDetail Schemas ──────────────────────────────────────

export const MajorSignDetailSchema = z.object({
  id: z.string(),
  majorSignId: z.string(),
  label: z.string(),
  content: z.string(),
  sortOrder: z.number(),
});

export const CreateMajorSignDetailSchema = z.object({
  label: z.string().min(1),
  content: z.string().min(1),
  sortOrder: z.number().optional().default(0),
});

export type MajorSignDetail = z.infer<typeof MajorSignDetailSchema>;
export type CreateMajorSignDetail = z.infer<typeof CreateMajorSignDetailSchema>;

// ─── MajorSign Schemas ───────────────────────────────────────────

export const MajorSignSchema = z.object({
  id: z.string(),
  slug: z.string(),
  number: z.number(),
  title: z.string(),
  arabicTitle: z.string(),
  subtitle: z.string(),
  description: z.string(),
  sources: z.array(z.string()),
  sourceUrl: z.string().nullable(),
  sourceLabel: z.string().nullable(),
  imageUrl: z.string().nullable(),
  imageSettings: z.string().nullable(),
  sortOrder: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  details: z.array(MajorSignDetailSchema),
});

export const CreateMajorSignSchema = z.object({
  slug: z.string().min(1),
  number: z.number().int(),
  title: z.string().min(1),
  arabicTitle: z.string().min(1),
  subtitle: z.string().min(1),
  description: z.string().min(1),
  sources: z.array(z.string()),
  sourceUrl: z.string().nullable().optional(),
  sourceLabel: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  imageSettings: z.string().nullable().optional(),
  sortOrder: z.number().optional().default(0),
  details: z.array(CreateMajorSignDetailSchema).optional().default([]),
});

export const UpdateMajorSignSchema = z.object({
  slug: z.string().min(1).optional(),
  number: z.number().int().optional(),
  title: z.string().min(1).optional(),
  arabicTitle: z.string().min(1).optional(),
  subtitle: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  sources: z.array(z.string()).optional(),
  sourceUrl: z.string().nullable().optional(),
  sourceLabel: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  imageSettings: z.string().nullable().optional(),
  sortOrder: z.number().optional(),
  details: z.array(CreateMajorSignDetailSchema).optional(),
});

export type MajorSign = z.infer<typeof MajorSignSchema>;
export type CreateMajorSign = z.infer<typeof CreateMajorSignSchema>;
export type UpdateMajorSign = z.infer<typeof UpdateMajorSignSchema>;

// ─── GlossaryTerm Schemas ────────────────────────────────────────

export const GlossaryTermSchema = z.object({
  id: z.string(),
  term: z.string(),
  arabic: z.string().nullable(),
  definition: z.string(),
  sourceUrl: z.string().nullable(),
  sourceLabel: z.string().nullable(),
  sortOrder: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CreateGlossaryTermSchema = z.object({
  term: z.string().min(1),
  arabic: z.string().nullable().optional(),
  definition: z.string().min(1),
  sourceUrl: z.string().nullable().optional(),
  sourceLabel: z.string().nullable().optional(),
  sortOrder: z.number().optional().default(0),
});

export const UpdateGlossaryTermSchema = CreateGlossaryTermSchema.partial();

export type GlossaryTerm = z.infer<typeof GlossaryTermSchema>;
export type CreateGlossaryTerm = z.infer<typeof CreateGlossaryTermSchema>;
export type UpdateGlossaryTerm = z.infer<typeof UpdateGlossaryTermSchema>;

// ─── QuranicVerse Schemas ────────────────────────────────────────

export const QuranicVerseSchema = z.object({
  id: z.string(),
  reference: z.string(),
  text: z.string(),
  context: z.string().nullable(),
  sourceUrl: z.string().nullable(),
  sourceLabel: z.string().nullable(),
  sortOrder: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CreateQuranicVerseSchema = z.object({
  reference: z.string().min(1),
  text: z.string().min(1),
  context: z.string().nullable().optional(),
  sourceUrl: z.string().nullable().optional(),
  sourceLabel: z.string().nullable().optional(),
  sortOrder: z.number().optional().default(0),
});

export const UpdateQuranicVerseSchema = CreateQuranicVerseSchema.partial();

export type QuranicVerse = z.infer<typeof QuranicVerseSchema>;
export type CreateQuranicVerse = z.infer<typeof CreateQuranicVerseSchema>;
export type UpdateQuranicVerse = z.infer<typeof UpdateQuranicVerseSchema>;

// ─── ScholarlyWork Schemas ───────────────────────────────────────

export const ScholarlyWorkSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  deathDate: z.string(),
  sourceUrl: z.string().nullable(),
  sourceLabel: z.string().nullable(),
  sortOrder: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CreateScholarlyWorkSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  deathDate: z.string().min(1),
  sourceUrl: z.string().nullable().optional(),
  sourceLabel: z.string().nullable().optional(),
  sortOrder: z.number().optional().default(0),
});

export const UpdateScholarlyWorkSchema = CreateScholarlyWorkSchema.partial();

export type ScholarlyWork = z.infer<typeof ScholarlyWorkSchema>;
export type CreateScholarlyWork = z.infer<typeof CreateScholarlyWorkSchema>;
export type UpdateScholarlyWork = z.infer<typeof UpdateScholarlyWorkSchema>;

// ─── TimelineEvent Schemas ───────────────────────────────────────

export const TimelineEventSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  status: z.string(),
  description: z.string(),
  sourceUrl: z.string().nullable(),
  sourceLabel: z.string().nullable(),
  imageUrl: z.string().nullable(),
  imageSettings: z.string().nullable(),
  sortOrder: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CreateTimelineEventSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  status: z.string().min(1),
  description: z.string().min(1),
  sourceUrl: z.string().nullable().optional(),
  sourceLabel: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  imageSettings: z.string().nullable().optional(),
  sortOrder: z.number().optional().default(0),
});

export const UpdateTimelineEventSchema = CreateTimelineEventSchema.partial();

export type TimelineEvent = z.infer<typeof TimelineEventSchema>;
export type CreateTimelineEvent = z.infer<typeof CreateTimelineEventSchema>;
export type UpdateTimelineEvent = z.infer<typeof UpdateTimelineEventSchema>;

// ─── Interpretation Schemas ──────────────────────────────────────

export const InterpretationSchema = z.object({
  id: z.string(),
  prophecy: z.string(),
  modernInterpretation: z.string(),
  scholarlyCaution: z.string(),
  sourceUrl: z.string().nullable(),
  sourceLabel: z.string().nullable(),
  sortOrder: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CreateInterpretationSchema = z.object({
  prophecy: z.string().min(1),
  modernInterpretation: z.string().min(1),
  scholarlyCaution: z.string().min(1),
  sourceUrl: z.string().nullable().optional(),
  sourceLabel: z.string().nullable().optional(),
  sortOrder: z.number().optional().default(0),
});

export const UpdateInterpretationSchema = CreateInterpretationSchema.partial();

export type Interpretation = z.infer<typeof InterpretationSchema>;
export type CreateInterpretation = z.infer<typeof CreateInterpretationSchema>;
export type UpdateInterpretation = z.infer<typeof UpdateInterpretationSchema>;

// ─── Announcement Banner ─────────────────────────────────────────

export const BannerVariantSchema = z.enum(["default", "warning", "success", "donation"]);

export const AnnouncementBannerSchema = z.object({
  id: z.string(),
  message: z.string(),
  linkText: z.string().nullable(),
  linkUrl: z.string().nullable(),
  variant: BannerVariantSchema,
  enabled: z.boolean(),
  sortOrder: z.number(),
});

export const CreateBannerSchema = z.object({
  message: z.string().min(1),
  linkText: z.string().nullable().optional(),
  linkUrl: z.string().nullable().optional(),
  variant: BannerVariantSchema.optional(),
  enabled: z.boolean().optional(),
  sortOrder: z.number().optional(),
});

export const UpdateBannerSchema = CreateBannerSchema.partial();

export type AnnouncementBanner = z.infer<typeof AnnouncementBannerSchema>;
export type CreateBanner = z.infer<typeof CreateBannerSchema>;
export type UpdateBanner = z.infer<typeof UpdateBannerSchema>;

// ─── Site Settings ───────────────────────────────────────────────

export const SiteSettingSchema = z.object({
  id: z.string(),
  key: z.string(),
  value: z.string(),
});

export const UpdateSiteSettingsSchema = z.record(z.string(), z.string());

export type SiteSetting = z.infer<typeof SiteSettingSchema>;
export type UpdateSiteSettings = z.infer<typeof UpdateSiteSettingsSchema>;

// ─── Homepage Response Schema ────────────────────────────────────

export const HomepageDataSchema = z.object({
  fulfilledSigns: z.array(SignSchema),
  unfoldingSigns: z.array(SignSchema),
  majorSigns: z.array(MajorSignSchema),
  interpretations: z.array(InterpretationSchema),
  featuredVerse: QuranicVerseSchema.nullable(),
  banners: z.array(AnnouncementBannerSchema),
  settings: z.record(z.string(), z.string()),
});

export type HomepageData = z.infer<typeof HomepageDataSchema>;
