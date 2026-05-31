import { buildSearchRecords, getPublicContent } from "@/lib/public-content";

export async function GET() {
  const content = await getPublicContent();
  return new Response(JSON.stringify(buildSearchRecords(content)), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
