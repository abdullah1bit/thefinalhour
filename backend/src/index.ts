import "@vibecodeapp/proxy"; // DO NOT REMOVE OTHERWISE VIBECODE PROXY WILL NOT WORK
import { Hono } from "hono";
import { cors } from "hono/cors";
import "./env";
import { logger } from "hono/logger";

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

const app = new Hono();

// CORS middleware - validates origin against allowlist
const allowed = [
  /^http:\/\/localhost(:\d+)?$/,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/,
  /^https:\/\/[a-z0-9-]+\.dev\.vibecode\.run$/,
  /^https:\/\/[a-z0-9-]+\.vibecode\.run$/,
  /^https:\/\/[a-z0-9-]+\.vibecodeapp\.com$/,
  /^https:\/\/[a-z0-9-]+\.vibecode\.dev$/,
  /^https:\/\/vibecode\.dev$/,
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
app.route("/api/site", siteRouter);

// Admin CRUD routes (protected by requireAdmin middleware)
app.route("/api/admin", adminRouter);

const port = Number(process.env.PORT) || 3000;

export default {
  port,
  fetch: app.fetch,
};
