import { Hono } from "hono";
import { prisma } from "../lib/prisma";

const timelineRouter = new Hono();

// GET / - list all timeline events ordered by sortOrder
timelineRouter.get("/", async (c) => {
  const events = await prisma.timelineEvent.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return c.json({
    data: events.map((e) => ({
      ...e,
      createdAt: e.createdAt.toISOString(),
      updatedAt: e.updatedAt.toISOString(),
    })),
  });
});

export { timelineRouter };
