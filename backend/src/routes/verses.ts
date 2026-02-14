import { Hono } from "hono";
import { prisma } from "../lib/prisma";

const versesRouter = new Hono();

// GET / - list all quranic verses ordered by sortOrder
versesRouter.get("/", async (c) => {
  const verses = await prisma.quranicVerse.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return c.json({
    data: verses.map((v) => ({
      ...v,
      createdAt: v.createdAt.toISOString(),
      updatedAt: v.updatedAt.toISOString(),
    })),
  });
});

export { versesRouter };
