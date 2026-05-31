import { Hono } from "hono";
import { prisma } from "../lib/prisma";

const interpretationsRouter = new Hono();

// GET / - list all interpretations ordered by sortOrder
interpretationsRouter.get("/", async (c) => {
  const interpretations = await prisma.interpretation.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return c.json({
    data: interpretations.map((i) => ({
      ...i,
      createdAt: i.createdAt.toISOString(),
      updatedAt: i.updatedAt.toISOString(),
    })),
  });
});

export { interpretationsRouter };
