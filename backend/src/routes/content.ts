import { Hono } from "hono";
import { prisma } from "../lib/prisma";

const contentRouter = new Hono();

// GET /api/content/homepage - returns all homepage data in one call
contentRouter.get("/homepage", async (c) => {
  const [fulfilledSigns, unfoldingSigns, approachingSigns, majorSigns, interpretations, banners, allSettings] =
    await Promise.all([
      prisma.sign.findMany({
        where: { status: "fulfilled" },
        orderBy: { sortOrder: "asc" },
      }),
      prisma.sign.findMany({
        where: { status: "unfolding" },
        orderBy: { sortOrder: "asc" },
      }),
      prisma.sign.findMany({
        where: { status: "approaching" },
        orderBy: { sortOrder: "asc" },
      }),
      prisma.majorSign.findMany({
        include: { details: { orderBy: { sortOrder: "asc" } } },
        orderBy: { number: "asc" },
      }),
      prisma.interpretation.findMany({
        orderBy: { sortOrder: "asc" },
      }),
      prisma.announcementBanner.findMany({
        where: { enabled: true },
        orderBy: { sortOrder: "asc" },
      }),
      prisma.siteSetting.findMany(),
    ]);

  const settings: Record<string, string> = {};
  allSettings.forEach((s) => { settings[s.key] = s.value; });

  // Dynamic featured verse - check settings for specific verse ID
  let featuredVerse = null;
  if (settings.featuredVerseId) {
    featuredVerse = await prisma.quranicVerse.findUnique({
      where: { id: settings.featuredVerseId },
    });
  }
  if (!featuredVerse) {
    featuredVerse = await prisma.quranicVerse.findFirst({
      orderBy: { sortOrder: "asc" },
    });
  }

  return c.json({
    data: {
      fulfilledSigns: fulfilledSigns.map(serializeSign),
      unfoldingSigns: unfoldingSigns.map(serializeSign),
      approachingSigns: approachingSigns.map(serializeSign),
      majorSigns: majorSigns.map(serializeMajorSign),
      interpretations: interpretations.map(serializeTimestamped),
      featuredVerse: featuredVerse ? serializeTimestamped(featuredVerse) : null,
      banners: banners.map((b) => ({
        ...b,
        createdAt: b.createdAt.toISOString(),
        updatedAt: b.updatedAt.toISOString(),
      })),
      settings,
    },
  });
});

function serializeSign(sign: { createdAt: Date; updatedAt: Date;[key: string]: unknown }) {
  return {
    ...sign,
    createdAt: sign.createdAt.toISOString(),
    updatedAt: sign.updatedAt.toISOString(),
  };
}

function serializeMajorSign(ms: {
  sources: string;
  details: Array<Record<string, unknown>>;
  createdAt: Date;
  updatedAt: Date;
  [key: string]: unknown;
}) {
  return {
    ...ms,
    sources: JSON.parse(ms.sources) as string[],
    createdAt: ms.createdAt.toISOString(),
    updatedAt: ms.updatedAt.toISOString(),
  };
}

function serializeTimestamped(item: { createdAt: Date; updatedAt: Date;[key: string]: unknown }) {
  return {
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  };
}

export { contentRouter };
