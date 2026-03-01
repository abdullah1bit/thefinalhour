import "@vibecodeapp/proxy"; // DO NOT REMOVE OTHERWISE VIBECODE PROXY WILL NOT WORK
import { Hono } from "hono";
import { cors } from "hono/cors";
import "./env";
import { logger } from "hono/logger";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

// Route imports
import { authRouter } from "./routes/auth";
import { contentRouter } from "./routes/content";
import { signsRouter } from "./routes/signs";
import { majorSignsRouter } from "./routes/major-signs";
import { glossaryRouter } from "./routes/glossary";
import { versesRouter } from "./routes/verses";
import { scholarlyWorksRouter } from "./routes/scholarly-works";
import { timelineRouter } from "./routes/timeline";
import { interpretationsRouter } from "./routes/interpretations";
import { adminRouter } from "./routes/admin";
import { siteRouter } from "./routes/site";
import { searchRouter } from "./routes/search";
import { uploadsRouter } from "./routes/uploads";
import { analyticsRouter } from "./routes/analytics";
import { serveStatic } from "hono/bun";

const app = new Hono();

// ─── Global Error Handler ───────────────────────────────────────
app.onError((err, c) => {
  console.error("Unhandled error:", err);

  // Zod validation errors
  if (err instanceof ZodError) {
    return c.json(
      {
        error: {
          message: "Validation error",
          code: "VALIDATION_ERROR",
          details: err.issues,
        },
      },
      400
    );
  }

  // Prisma "record not found" (P2025)
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2025"
  ) {
    return c.json(
      { error: { message: "Not found", code: "NOT_FOUND" } },
      404
    );
  }

  // Prisma "unique constraint violation" (P2002)
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2002"
  ) {
    return c.json(
      { error: { message: "Already exists", code: "CONFLICT" } },
      409
    );
  }

  // Everything else
  return c.json(
    { error: { message: "Internal server error", code: "INTERNAL_ERROR" } },
    500
  );
});

// CORS middleware - validates origin against allowlist
const allowed = [
  /^http:\/\/localhost(:\d+)?$/,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/,
  /^https:\/\/[a-z0-9-]+\.dev\.vibecode\.run$/,
  /^https:\/\/[a-z0-9-]+\.vibecode\.run$/,
  /^https:\/\/[a-z0-9-]+\.vibecodeapp\.com$/,
  /^https:\/\/[a-z0-9-]+\.vibecode\.dev$/,
  /^https:\/\/vibecode\.dev$/,
  /^https:\/\/[a-z0-9-]+\.vercel\.app$/, // Allow all Vercel domains
  /^https:\/\/[a-z0-9-]+\.thefinalhour\.com$/, // Allow the custom domain
  /^https:\/\/thefinalhour\.com$/,
];

app.use(
  "*",
  cors({
    origin: (origin) => (origin && allowed.some((re) => re.test(origin)) ? origin : null),
    credentials: true,
  })
);

// Logging
app.use("*", logger());

// Serve uploaded files
app.use("/uploads/*", serveStatic({ root: "./" }));

// Health check endpoint
app.get("/health", (c) => c.json({ status: "ok" }));

// Auth routes (Better Auth handles its own responses)
app.route("/api/auth", authRouter);

// Public content routes
app.route("/api/content", contentRouter);
app.route("/api/signs", signsRouter);
app.route("/api/major-signs", majorSignsRouter);
app.route("/api/glossary", glossaryRouter);
app.route("/api/verses", versesRouter);
app.route("/api/scholarly-works", scholarlyWorksRouter);
app.route("/api/timeline", timelineRouter);
app.route("/api/interpretations", interpretationsRouter);
app.route("/api/search", searchRouter);
app.route("/api/site", siteRouter);
app.route("/api/analytics", analyticsRouter);

// Upload routes (must be before general admin route)
app.route("/api/admin/upload", uploadsRouter);

// Admin CRUD routes (protected by requireAdmin middleware)
app.route("/api/admin", adminRouter);

// ─── 404 catch-all ──────────────────────────────────────────────
app.notFound((c) =>
  c.json({ error: { message: "Not found", code: "NOT_FOUND" } }, 404)
);

const port = Number(process.env.PORT) || 3000;

export default {
  port,
  fetch: app.fetch,
};
