import { Hono } from "hono";
import { prisma } from "../lib/prisma";

const contentRouter = new Hono();

// GET /api/content/homepage - returns all homepage data in one call
contentRouter.get("/homepage", async (c) => {
  const [fulfilledSigns, unfoldingSigns, majorSigns, interpretations, featuredVerse] =
    await Promise.all([
      prisma.sign.findMany({
        where: { status: "fulfilled" },
        orderBy: { sortOrder: "asc" },
      }),
      prisma.sign.findMany({
        where: { status: "unfolding" },
        orderBy: { sortOrder: "asc" },
      }),
      prisma.majorSign.findMany({
        include: { details: { orderBy: { sortOrder: "asc" } } },
        orderBy: { number: "asc" },
      }),
      prisma.interpretation.findMany({
        orderBy: { sortOrder: "asc" },
      }),
      prisma.quranicVerse.findFirst({
        orderBy: { sortOrder: "asc" },
      }),
    ]);

  return c.json({
    data: {
      fulfilledSigns: fulfilledSigns.map(serializeSign),
      unfoldingSigns: unfoldingSigns.map(serializeSign),
      majorSigns: majorSigns.map(serializeMajorSign),
      interpretations: interpretations.map(serializeTimestamped),
      featuredVerse: featuredVerse ? serializeTimestamped(featuredVerse) : null,
    },
  });
});

function serializeSign(sign: { createdAt: Date; updatedAt: Date; [key: string]: unknown }) {
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

function serializeTimestamped(item: { createdAt: Date; updatedAt: Date; [key: string]: unknown }) {
  return {
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  };
}

export { contentRouter };
