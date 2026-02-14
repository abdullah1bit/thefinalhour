import { Hono } from "hono";
import { prisma } from "../lib/prisma";

const searchRouter = new Hono();

searchRouter.get("/", async (c) => {
  const q = c.req.query("q")?.trim();

  if (!q || q.length < 2) {
    return c.json({ data: [] });
  }

  // Search across all content types using Prisma contains (SQLite LIKE)
  const [signs, majorSigns, glossary, timeline] = await Promise.all([
    prisma.sign.findMany({
      where: {
        OR: [
          { title: { contains: q } },
          { description: { contains: q } },
        ],
      },
      take: 10,
    }),
    prisma.majorSign.findMany({
      where: {
        OR: [
          { title: { contains: q } },
          { description: { contains: q } },
          { subtitle: { contains: q } },
        ],
      },
      take: 5,
    }),
    prisma.glossaryTerm.findMany({
      where: {
        OR: [
          { term: { contains: q } },
          { definition: { contains: q } },
        ],
      },
      take: 10,
    }),
    prisma.timelineEvent.findMany({
      where: {
        OR: [
          { title: { contains: q } },
          { description: { contains: q } },
        ],
      },
      take: 10,
    }),
  ]);

  const results = [
    ...signs.map((s) => ({
      type: "sign" as const,
      id: s.id,
      title: s.title,
      description: s.description.substring(0, 150),
      status: s.status,
    })),
    ...majorSigns.map((ms) => ({
      type: "major-sign" as const,
      id: ms.id,
      title: ms.title,
      description: ms.description.substring(0, 150),
      status: null,
    })),
    ...glossary.map((g) => ({
      type: "glossary" as const,
      id: g.id,
      title: g.term,
      description: g.definition.substring(0, 150),
      status: null,
    })),
    ...timeline.map((t) => ({
      type: "timeline" as const,
      id: t.id,
      title: t.title,
      description: t.description.substring(0, 150),
      status: t.status,
    })),
  ];

  return c.json({ data: results });
});

export { searchRouter };
