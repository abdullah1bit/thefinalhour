import { Hono } from "hono";
import { prisma } from "../lib/prisma";

const majorSignsRouter = new Hono();

// GET / - list all major signs with details, ordered by number
majorSignsRouter.get("/", async (c) => {
  const majorSigns = await prisma.majorSign.findMany({
    include: { details: { orderBy: { sortOrder: "asc" } } },
    orderBy: { number: "asc" },
  });

  return c.json({
    data: majorSigns.map((ms) => ({
      ...ms,
      sources: JSON.parse(ms.sources) as string[],
      createdAt: ms.createdAt.toISOString(),
      updatedAt: ms.updatedAt.toISOString(),
    })),
  });
});

// GET /:id - single major sign by ID with details
majorSignsRouter.get("/:id", async (c) => {
  const id = c.req.param("id");

  const majorSign = await prisma.majorSign.findUnique({
    where: { id },
    include: { details: { orderBy: { sortOrder: "asc" } } },
  });

  if (!majorSign) {
    return c.json({ error: { message: "Major sign not found", code: "NOT_FOUND" } }, 404);
  }

  return c.json({
    data: {
      ...majorSign,
      sources: JSON.parse(majorSign.sources) as string[],
      createdAt: majorSign.createdAt.toISOString(),
      updatedAt: majorSign.updatedAt.toISOString(),
    },
  });
});

export { majorSignsRouter };
