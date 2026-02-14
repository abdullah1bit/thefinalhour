import { Hono } from "hono";
import { auth } from "../lib/auth";

const authRouter = new Hono();

authRouter.all("/*", async (c) => {
  return auth.handler(c.req.raw);
});

export { authRouter };
