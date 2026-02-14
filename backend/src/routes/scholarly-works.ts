import { Hono } from "hono";
import { prisma } from "../lib/prisma";

const scholarlyWorksRouter = new Hono();

// GET / - list all scholarly works ordered by sortOrder
scholarlyWorksRouter.get("/", async (c) => {
  const works = await prisma.scholarlyWork.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return c.json({
    data: works.map((w) => ({
      ...w,
      createdAt: w.createdAt.toISOString(),
      updatedAt: w.updatedAt.toISOString(),
    })),
  });
});

export { scholarlyWorksRouter };
