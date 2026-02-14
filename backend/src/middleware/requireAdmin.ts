import type { Context, Next } from "hono";
import { auth } from "../lib/auth";

export async function requireAdmin(c: Context, next: Next) {
  try {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });

    if (!session) {
      return c.json({ error: { message: "Unauthorized", code: "UNAUTHORIZED" } }, 401);
    }

    if (session.user.role !== "admin") {
      return c.json({ error: { message: "Forbidden: admin access required", code: "FORBIDDEN" } }, 403);
    }

    c.set("user", session.user);
    c.set("session", session.session);

    await next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return c.json({ error: { message: "Authentication failed", code: "AUTH_ERROR" } }, 401);
  }
}
