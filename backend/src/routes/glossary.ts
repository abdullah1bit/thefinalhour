import { Hono } from "hono";
import { prisma } from "../lib/prisma";

const glossaryRouter = new Hono();

// GET / - list all glossary terms ordered by sortOrder
glossaryRouter.get("/", async (c) => {
  const terms = await prisma.glossaryTerm.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return c.json({
    data: terms.map((t) => ({
      ...t,
      createdAt: t.createdAt.toISOString(),
      updatedAt: t.updatedAt.toISOString(),
    })),
  });
});

export { glossaryRouter };
