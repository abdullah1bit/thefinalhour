import { Hono } from "hono";
import { requireAdmin } from "../middleware/requireAdmin";
import { uploadToCloudinary } from "../lib/cloudinary";

const uploadsRouter = new Hono();

// All upload routes require admin authentication
uploadsRouter.use("*", requireAdmin);

uploadsRouter.post("/", async (c) => {
  try {
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

    // Upload to Cloudinary instead of local disk
    const imageUrl = await uploadToCloudinary(file);

    // We return the full Cloudinary URL (https://res.cloudinary.com/...)
    return c.json({ data: { url: imageUrl } }, 201);
    
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return c.json({ error: { message: "Failed to upload image to cloud storage", code: "INTERNAL_ERROR" } }, 500);
  }
});

export { uploadsRouter };