import { Hono } from "hono";
import { requireAdmin } from "../middleware/requireAdmin";
import { join } from "path";
import { mkdir } from "fs/promises";

const uploadsRouter = new Hono();

// All upload routes require admin authentication
uploadsRouter.use("*", requireAdmin);

uploadsRouter.post("/", async (c) => {
  const formData = await c.req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return c.json({ error: { message: "No file provided", code: "BAD_REQUEST" } }, 400);
  }

  // Validate file type (images only)
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
  if (!allowedTypes.includes(file.type)) {
    return c.json(
      { error: { message: "Invalid file type. Allowed: JPEG, PNG, WebP, GIF, SVG", code: "BAD_REQUEST" } },
      400
    );
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return c.json(
      { error: { message: "File too large. Maximum size is 5MB", code: "BAD_REQUEST" } },
      400
    );
  }

  // Generate unique filename
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  // Ensure uploads directory exists
  const uploadsDir = join(process.cwd(), "uploads");
  await mkdir(uploadsDir, { recursive: true });

  // Write file using Bun
  const buffer = await file.arrayBuffer();
  await Bun.write(join(uploadsDir, filename), buffer);

  return c.json({ data: { url: `/uploads/${filename}` } }, 201);
});

export { uploadsRouter };
