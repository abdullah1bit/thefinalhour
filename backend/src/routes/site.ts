import { Hono } from "hono";
import { prisma } from "../lib/prisma";

const siteRouter = new Hono();

// GET /api/site/banner - returns active banners
siteRouter.get("/banner", async (c) => {
  const banners = await prisma.announcementBanner.findMany({
    where: { enabled: true },
    orderBy: { sortOrder: "asc" },
  });

  return c.json({
    data: banners.map((b) => ({
      ...b,
      createdAt: b.createdAt.toISOString(),
      updatedAt: b.updatedAt.toISOString(),
    })),
  });
});

// GET /api/site/settings - returns all settings as key-value object
siteRouter.get("/settings", async (c) => {
  const settings = await prisma.siteSetting.findMany();
  const obj: Record<string, string> = {};
  settings.forEach((s) => { obj[s.key] = s.value; });

  return c.json({ data: obj });
});

export { siteRouter };
