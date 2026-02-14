import { Hono } from "hono";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { auth } from "../lib/auth";
import { requireAdmin } from "../middleware/requireAdmin";
import {
  CreateSignSchema,
  UpdateSignSchema,
  CreateMajorSignSchema,
  UpdateMajorSignSchema,
  CreateGlossaryTermSchema,
  UpdateGlossaryTermSchema,
  CreateQuranicVerseSchema,
  UpdateQuranicVerseSchema,
  CreateScholarlyWorkSchema,
  UpdateScholarlyWorkSchema,
  CreateTimelineEventSchema,
  UpdateTimelineEventSchema,
  CreateInterpretationSchema,
  UpdateInterpretationSchema,
  CreateBannerSchema,
  UpdateBannerSchema,
  UpdateSiteSettingsSchema,
} from "../types";

const adminRouter = new Hono();

// Apply admin middleware to all routes
adminRouter.use("*", requireAdmin);

// ─── Signs CRUD ──────────────────────────────────────────────────

adminRouter.post("/signs", async (c) => {
  const body = await c.req.json();
  const parsed = CreateSignSchema.parse(body);

  const sign = await prisma.sign.create({ data: parsed });

  return c.json({
    data: {
      ...sign,
      createdAt: sign.createdAt.toISOString(),
      updatedAt: sign.updatedAt.toISOString(),
    },
  }, 201);
});

adminRouter.put("/signs/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const parsed = UpdateSignSchema.parse(body);

  const sign = await prisma.sign.update({
    where: { id },
    data: parsed,
  });

  return c.json({
    data: {
      ...sign,
      createdAt: sign.createdAt.toISOString(),
      updatedAt: sign.updatedAt.toISOString(),
    },
  });
});

adminRouter.delete("/signs/:id", async (c) => {
  await prisma.sign.delete({ where: { id: c.req.param("id") } });
  return c.body(null, 204);
});

// ─── Major Signs CRUD ────────────────────────────────────────────

adminRouter.post("/major-signs", async (c) => {
  const body = await c.req.json();
  const parsed = CreateMajorSignSchema.parse(body);

  const { details, sources, ...rest } = parsed;

  const majorSign = await prisma.majorSign.create({
    data: {
      ...rest,
      sources: JSON.stringify(sources),
      details: {
        create: details.map((d, i) => ({ ...d, sortOrder: d.sortOrder ?? i })),
      },
    },
    include: { details: { orderBy: { sortOrder: "asc" } } },
  });

  return c.json({
    data: {
      ...majorSign,
      sources: JSON.parse(majorSign.sources) as string[],
      createdAt: majorSign.createdAt.toISOString(),
      updatedAt: majorSign.updatedAt.toISOString(),
    },
  }, 201);
});

adminRouter.put("/major-signs/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const parsed = UpdateMajorSignSchema.parse(body);

  const { details, sources, ...rest } = parsed;

  // Build update data
  const updateData: Record<string, unknown> = { ...rest };
  if (sources !== undefined) {
    updateData.sources = JSON.stringify(sources);
  }

  // If details provided, delete existing and recreate
  if (details !== undefined) {
    await prisma.majorSignDetail.deleteMany({ where: { majorSignId: id } });
    await prisma.majorSign.update({
      where: { id },
      data: {
        ...updateData,
        details: {
          create: details.map((d, i) => ({ ...d, sortOrder: d.sortOrder ?? i })),
        },
      },
    });
  } else {
    await prisma.majorSign.update({
      where: { id },
      data: updateData,
    });
  }

  const majorSign = await prisma.majorSign.findUniqueOrThrow({
    where: { id },
    include: { details: { orderBy: { sortOrder: "asc" } } },
  });

  return c.json({
    data: {
      ...majorSign,
      sources: JSON.parse(majorSign.sources) as string[],
      createdAt: majorSign.createdAt.toISOString(),
      updatedAt: majorSign.updatedAt.toISOString(),
    },
  });
});

adminRouter.delete("/major-signs/:id", async (c) => {
  await prisma.majorSign.delete({ where: { id: c.req.param("id") } });
  return c.body(null, 204);
});

// ─── Glossary CRUD ───────────────────────────────────────────────

adminRouter.post("/glossary", async (c) => {
  const body = await c.req.json();
  const parsed = CreateGlossaryTermSchema.parse(body);

  const term = await prisma.glossaryTerm.create({ data: parsed });

  return c.json({
    data: {
      ...term,
      createdAt: term.createdAt.toISOString(),
      updatedAt: term.updatedAt.toISOString(),
    },
  }, 201);
});

adminRouter.put("/glossary/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const parsed = UpdateGlossaryTermSchema.parse(body);

  const term = await prisma.glossaryTerm.update({
    where: { id },
    data: parsed,
  });

  return c.json({
    data: {
      ...term,
      createdAt: term.createdAt.toISOString(),
      updatedAt: term.updatedAt.toISOString(),
    },
  });
});

adminRouter.delete("/glossary/:id", async (c) => {
  await prisma.glossaryTerm.delete({ where: { id: c.req.param("id") } });
  return c.body(null, 204);
});

// ─── Verses CRUD ─────────────────────────────────────────────────

adminRouter.post("/verses", async (c) => {
  const body = await c.req.json();
  const parsed = CreateQuranicVerseSchema.parse(body);

  const verse = await prisma.quranicVerse.create({ data: parsed });

  return c.json({
    data: {
      ...verse,
      createdAt: verse.createdAt.toISOString(),
      updatedAt: verse.updatedAt.toISOString(),
    },
  }, 201);
});

adminRouter.put("/verses/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const parsed = UpdateQuranicVerseSchema.parse(body);

  const verse = await prisma.quranicVerse.update({
    where: { id },
    data: parsed,
  });

  return c.json({
    data: {
      ...verse,
      createdAt: verse.createdAt.toISOString(),
      updatedAt: verse.updatedAt.toISOString(),
    },
  });
});

adminRouter.delete("/verses/:id", async (c) => {
  await prisma.quranicVerse.delete({ where: { id: c.req.param("id") } });
  return c.body(null, 204);
});

// ─── Scholarly Works CRUD ────────────────────────────────────────

adminRouter.post("/scholarly-works", async (c) => {
  const body = await c.req.json();
  const parsed = CreateScholarlyWorkSchema.parse(body);

  const work = await prisma.scholarlyWork.create({ data: parsed });

  return c.json({
    data: {
      ...work,
      createdAt: work.createdAt.toISOString(),
      updatedAt: work.updatedAt.toISOString(),
    },
  }, 201);
});

adminRouter.put("/scholarly-works/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const parsed = UpdateScholarlyWorkSchema.parse(body);

  const work = await prisma.scholarlyWork.update({
    where: { id },
    data: parsed,
  });

  return c.json({
    data: {
      ...work,
      createdAt: work.createdAt.toISOString(),
      updatedAt: work.updatedAt.toISOString(),
    },
  });
});

adminRouter.delete("/scholarly-works/:id", async (c) => {
  await prisma.scholarlyWork.delete({ where: { id: c.req.param("id") } });
  return c.body(null, 204);
});

// ─── Timeline CRUD ───────────────────────────────────────────────

adminRouter.post("/timeline", async (c) => {
  const body = await c.req.json();
  const parsed = CreateTimelineEventSchema.parse(body);

  const event = await prisma.timelineEvent.create({ data: parsed });

  return c.json({
    data: {
      ...event,
      createdAt: event.createdAt.toISOString(),
      updatedAt: event.updatedAt.toISOString(),
    },
  }, 201);
});

adminRouter.put("/timeline/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const parsed = UpdateTimelineEventSchema.parse(body);

  const event = await prisma.timelineEvent.update({
    where: { id },
    data: parsed,
  });

  return c.json({
    data: {
      ...event,
      createdAt: event.createdAt.toISOString(),
      updatedAt: event.updatedAt.toISOString(),
    },
  });
});

adminRouter.delete("/timeline/:id", async (c) => {
  await prisma.timelineEvent.delete({ where: { id: c.req.param("id") } });
  return c.body(null, 204);
});

// ─── Interpretations CRUD ────────────────────────────────────────

adminRouter.post("/interpretations", async (c) => {
  const body = await c.req.json();
  const parsed = CreateInterpretationSchema.parse(body);

  const interpretation = await prisma.interpretation.create({ data: parsed });

  return c.json({
    data: {
      ...interpretation,
      createdAt: interpretation.createdAt.toISOString(),
      updatedAt: interpretation.updatedAt.toISOString(),
    },
  }, 201);
});

adminRouter.put("/interpretations/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const parsed = UpdateInterpretationSchema.parse(body);

  const interpretation = await prisma.interpretation.update({
    where: { id },
    data: parsed,
  });

  return c.json({
    data: {
      ...interpretation,
      createdAt: interpretation.createdAt.toISOString(),
      updatedAt: interpretation.updatedAt.toISOString(),
    },
  });
});

adminRouter.delete("/interpretations/:id", async (c) => {
  await prisma.interpretation.delete({ where: { id: c.req.param("id") } });
  return c.body(null, 204);
});

// ─── Banner CRUD ────────────────────────────────────────────────

adminRouter.get("/banners", async (c) => {
  const banners = await prisma.announcementBanner.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return c.json({
    data: banners.map((b) => ({
      ...b,
      createdAt: b.createdAt.toISOString(),
      updatedAt: b.updatedAt.toISOString(),
    })),
  });
});

adminRouter.post("/banners", async (c) => {
  const body = await c.req.json();
  const parsed = CreateBannerSchema.parse(body);
  const banner = await prisma.announcementBanner.create({ data: parsed });
  return c.json({
    data: {
      ...banner,
      createdAt: banner.createdAt.toISOString(),
      updatedAt: banner.updatedAt.toISOString(),
    },
  }, 201);
});

adminRouter.put("/banners/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const parsed = UpdateBannerSchema.parse(body);
  const banner = await prisma.announcementBanner.update({
    where: { id },
    data: parsed,
  });
  return c.json({
    data: {
      ...banner,
      createdAt: banner.createdAt.toISOString(),
      updatedAt: banner.updatedAt.toISOString(),
    },
  });
});

adminRouter.delete("/banners/:id", async (c) => {
  await prisma.announcementBanner.delete({ where: { id: c.req.param("id") } });
  return c.body(null, 204);
});

// ─── Site Settings CRUD ─────────────────────────────────────────

adminRouter.get("/settings", async (c) => {
  const settings = await prisma.siteSetting.findMany();
  const obj: Record<string, string> = {};
  settings.forEach((s) => { obj[s.key] = s.value; });
  return c.json({ data: obj });
});

adminRouter.put("/settings", async (c) => {
  const body = await c.req.json();
  const parsed = UpdateSiteSettingsSchema.parse(body);

  // Upsert each setting
  for (const [key, value] of Object.entries(parsed)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  const settings = await prisma.siteSetting.findMany();
  const obj: Record<string, string> = {};
  settings.forEach((s) => { obj[s.key] = s.value; });
  return c.json({ data: obj });
});

// ─── Password Change ──────────────────────────────────────────
adminRouter.put("/change-password", async (c) => {
  const body = await c.req.json();
  const schema = z.object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
  });
  const parsed = schema.parse(body);

  // Use Better Auth's changePassword API (identifies user via session headers)
  const result = await auth.api.changePassword({
    headers: c.req.raw.headers,
    body: {
      currentPassword: parsed.currentPassword,
      newPassword: parsed.newPassword,
    },
  });

  return c.json({ data: { success: true } });
});

// ─── Content Export ─────────────────────────────────────────────
adminRouter.get("/export", async (c) => {
  const [signs, majorSigns, glossary, verses, works, timeline, interpretations, banners, settings] =
    await Promise.all([
      prisma.sign.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.majorSign.findMany({
        include: { details: { orderBy: { sortOrder: "asc" } } },
        orderBy: { number: "asc" },
      }),
      prisma.glossaryTerm.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.quranicVerse.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.scholarlyWork.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.timelineEvent.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.interpretation.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.announcementBanner.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.siteSetting.findMany(),
    ]);

  const settingsObj: Record<string, string> = {};
  settings.forEach((s) => { settingsObj[s.key] = s.value; });

  return c.json({
    data: {
      exportedAt: new Date().toISOString(),
      signs,
      majorSigns: majorSigns.map((ms) => ({
        ...ms,
        sources: JSON.parse(ms.sources) as string[],
      })),
      glossary,
      verses,
      scholarlyWorks: works,
      timeline,
      interpretations,
      banners,
      settings: settingsObj,
    },
  });
});

// ─── Content Import ─────────────────────────────────────────────
adminRouter.post("/import", async (c) => {
  const body = await c.req.json();

  // Validate top-level structure
  const importSchema = z.object({
    signs: z.array(z.any()).optional(),
    majorSigns: z.array(z.any()).optional(),
    glossary: z.array(z.any()).optional(),
    verses: z.array(z.any()).optional(),
    scholarlyWorks: z.array(z.any()).optional(),
    timeline: z.array(z.any()).optional(),
    interpretations: z.array(z.any()).optional(),
    banners: z.array(z.any()).optional(),
    settings: z.record(z.string(), z.string()).optional(),
  });

  const parsed = importSchema.parse(body);
  const results: Record<string, number> = {};

  // Use a transaction for atomicity
  await prisma.$transaction(async (tx) => {
    if (parsed.signs?.length) {
      await tx.sign.deleteMany();
      for (const sign of parsed.signs) {
        const { id, createdAt, updatedAt, ...data } = sign;
        await tx.sign.create({ data: { ...data, sortOrder: data.sortOrder ?? 0 } });
      }
      results.signs = parsed.signs.length;
    }

    if (parsed.majorSigns?.length) {
      await tx.majorSignDetail.deleteMany();
      await tx.majorSign.deleteMany();
      for (const ms of parsed.majorSigns) {
        const { id, createdAt, updatedAt, details, ...data } = ms;
        await tx.majorSign.create({
          data: {
            ...data,
            sources: Array.isArray(data.sources) ? JSON.stringify(data.sources) : data.sources,
            sortOrder: data.sortOrder ?? 0,
            details: {
              create: (details || []).map((d: any, i: number) => ({
                label: d.label,
                content: d.content,
                sortOrder: d.sortOrder ?? i,
              })),
            },
          },
        });
      }
      results.majorSigns = parsed.majorSigns.length;
    }

    if (parsed.glossary?.length) {
      await tx.glossaryTerm.deleteMany();
      for (const term of parsed.glossary) {
        const { id, createdAt, updatedAt, ...data } = term;
        await tx.glossaryTerm.create({ data: { ...data, sortOrder: data.sortOrder ?? 0 } });
      }
      results.glossary = parsed.glossary.length;
    }

    if (parsed.verses?.length) {
      await tx.quranicVerse.deleteMany();
      for (const verse of parsed.verses) {
        const { id, createdAt, updatedAt, ...data } = verse;
        await tx.quranicVerse.create({ data: { ...data, sortOrder: data.sortOrder ?? 0 } });
      }
      results.verses = parsed.verses.length;
    }

    if (parsed.scholarlyWorks?.length) {
      await tx.scholarlyWork.deleteMany();
      for (const work of parsed.scholarlyWorks) {
        const { id, createdAt, updatedAt, ...data } = work;
        await tx.scholarlyWork.create({ data: { ...data, sortOrder: data.sortOrder ?? 0 } });
      }
      results.scholarlyWorks = parsed.scholarlyWorks.length;
    }

    if (parsed.timeline?.length) {
      await tx.timelineEvent.deleteMany();
      for (const event of parsed.timeline) {
        const { id, createdAt, updatedAt, ...data } = event;
        await tx.timelineEvent.create({ data: { ...data, sortOrder: data.sortOrder ?? 0 } });
      }
      results.timeline = parsed.timeline.length;
    }

    if (parsed.interpretations?.length) {
      await tx.interpretation.deleteMany();
      for (const interp of parsed.interpretations) {
        const { id, createdAt, updatedAt, ...data } = interp;
        await tx.interpretation.create({ data: { ...data, sortOrder: data.sortOrder ?? 0 } });
      }
      results.interpretations = parsed.interpretations.length;
    }

    if (parsed.banners?.length) {
      await tx.announcementBanner.deleteMany();
      for (const banner of parsed.banners) {
        const { id, createdAt, updatedAt, ...data } = banner;
        await tx.announcementBanner.create({ data: { ...data, sortOrder: data.sortOrder ?? 0 } });
      }
      results.banners = parsed.banners.length;
    }

    if (parsed.settings && Object.keys(parsed.settings).length > 0) {
      for (const [key, value] of Object.entries(parsed.settings)) {
        await tx.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      }
      results.settings = Object.keys(parsed.settings).length;
    }
  });

  return c.json({ data: { imported: results } });
});

export { adminRouter };
