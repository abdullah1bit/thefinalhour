import { Hono } from "hono";
import { prisma } from "../lib/prisma";

const signsRouter = new Hono();

// GET / - list all signs (optional ?status= filter)
signsRouter.get("/", async (c) => {
  const status = c.req.query("status");
  const where = status ? { status } : {};

  const signs = await prisma.sign.findMany({
    where,
    orderBy: { sortOrder: "asc" },
  });

  return c.json({
    data: signs.map((s) => ({
      ...s,
      createdAt: s.createdAt.toISOString(),
      updatedAt: s.updatedAt.toISOString(),
    })),
  });
});

// GET /:id - single sign by ID
signsRouter.get("/:id", async (c) => {
  const id = c.req.param("id");

  const sign = await prisma.sign.findUnique({ where: { id } });

  if (!sign) {
    return c.json({ error: { message: "Sign not found", code: "NOT_FOUND" } }, 404);
  }

  return c.json({
    data: {
      ...sign,
      createdAt: sign.createdAt.toISOString(),
      updatedAt: sign.updatedAt.toISOString(),
    },
  });
});

export { signsRouter };
