import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { requireAdmin } from "../middleware/requireAdmin";

const prisma = new PrismaClient();
export const analyticsRouter = new Hono();

// Generate public endpoint to log a visit
analyticsRouter.post("/track", async (c) => {
    try {
        const { path } = await c.req.json();
        if (!path) {
            return c.json({ error: "Path is required" }, 400);
        }

        // Try multiple headers - Vercel, Cloudflare, or local
        const countryCode =
            c.req.header("x-vercel-ip-country") ||
            c.req.header("cf-ipcountry") ||
            "Unknown";

        await prisma.pageVisit.create({
            data: {
                path,
                countryCode,
            },
        });

        return c.json({ success: true });
    } catch (error) {
        console.error("Error logging visit:", error);
        return c.json({ error: "Internal Server Error" }, 500);
    }
});

// Admin-only endpoint to get grouped stats
analyticsRouter.get("/stats", requireAdmin, async (c) => {
    try {
        const totalVisits = await prisma.pageVisit.count();

        // Group visits by country
        const visitsByCountry = await prisma.pageVisit.groupBy({
            by: ["countryCode"],
            _count: {
                _all: true,
            },
            orderBy: {
                _count: {
                    countryCode: "desc",
                },
            },
            take: 10,
        });

        // We can't use grouped functions easily for exact hours in Prisma without raw queries
        // So we'll get visits from the last 72 hours and group them in JS
        const threeDaysAgo = new Date();
        threeDaysAgo.setHours(threeDaysAgo.getHours() - 72);

        const recentVisits = await prisma.pageVisit.findMany({
            where: {
                visitedAt: {
                    gte: threeDaysAgo,
                },
            },
            select: {
                visitedAt: true,
            },
        });

        // Group by hour
        const hourlyVisitsMap = new Map<string, number>();

        recentVisits.forEach((visit) => {
            // Format as "YYYY-MM-DD HH:00"
            const date = new Date(visit.visitedAt);
            const hourKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:00`;

            hourlyVisitsMap.set(hourKey, (hourlyVisitsMap.get(hourKey) || 0) + 1);
        });

        // Convert map to sorted array
        const hourlyVisits = Array.from(hourlyVisitsMap.entries())
            .map(([hour, count]) => ({ hour, count }))
            .sort((a, b) => a.hour.localeCompare(b.hour));

        return c.json({
            data: {
                totalVisits,
                visitsByCountry: visitsByCountry.map((v: any) => ({
                    countryCode: v.countryCode,
                    count: v._count._all
                })),
                hourlyVisits,
            }
        });
    } catch (error) {
        console.error("Error fetching analytics stats:", error);
        return c.json({ error: "Internal Server Error" }, 500);
    }
});
