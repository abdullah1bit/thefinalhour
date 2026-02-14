import { Hono } from "hono";
import { prisma } from "../lib/prisma";
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

export { adminRouter };
