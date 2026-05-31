import { Hono } from "hono";
import { z } from "zod";
import { requireAdmin } from "../middleware/requireAdmin";
import { uploadToCloudinary } from "../lib/cloudinary";

const uploadsRouter = new Hono();

// All upload routes require admin authentication
uploadsRouter.use("*", requireAdmin);

uploadsRouter.post("/", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get("file");

    const fileSchema = z.instanceof(File, { message: "No file provided" })
      .refine(
        (f) => f.size <= 5 * 1024 * 1024,
        "File too large. Maximum size is 5MB."
      )
      .refine(
        (f) => ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"].includes(f.type),
        "Invalid file type. Allowed: JPEG, PNG, WebP, GIF, SVG."
      );

    const parseResult = fileSchema.safeParse(file);

    if (!parseResult.success) {
      return c.json(
        { error: { message: (parseResult.error as any).issues[0].message, code: "BAD_REQUEST" } },
        400
      );
    }

    const validatedFile = parseResult.data;

    // Upload to Cloudinary instead of local disk
    const imageUrl = await uploadToCloudinary(validatedFile);

    // We return the full Cloudinary URL (https://res.cloudinary.com/...)
    return c.json({ data: { url: imageUrl } }, 201);

  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return c.json({ error: { message: "Failed to upload image to cloud storage", code: "INTERNAL_ERROR" } }, 500);
  }
});

export { uploadsRouter };