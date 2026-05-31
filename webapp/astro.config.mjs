import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import path from "node:path";

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || "https://thefinalhour.vercel.app",
  output: "static",
  integrations: [react()],
  server: {
    host: "0.0.0.0",
    port: 8000,
  },
  vite: {
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: process.env.VITE_BACKEND_URL || "http://localhost:3000",
          changeOrigin: true,
        },
        "/uploads": {
          target: process.env.VITE_BACKEND_URL || "http://localhost:3000",
          changeOrigin: true,
        },
      },
    },
  },
});
