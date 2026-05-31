import { getPublicContent, glossarySlug, SITE_URL } from "@/lib/public-content";

function url(path: string) {
  return `  <url><loc>${new URL(path, SITE_URL).toString()}</loc><changefreq>weekly</changefreq></url>`;
}

export async function GET() {
  const content = await getPublicContent();
  const urls = [
    "/",
    "/signs/",
    "/signs/fulfilled/",
    "/signs/unfolding/",
    "/signs/approaching/",
    "/major-signs/",
    "/timeline/",
    "/glossary/",
    "/references/",
    "/search/",
    ...content.signs.map((sign) => `/signs/${sign.slug}/`),
    ...content.majorSigns.map((sign) => `/major-signs/${sign.slug}/`),
    ...content.timeline.map((event) => `/timeline/${event.slug}/`),
    ...content.glossary.map((term) => `/glossary/${glossarySlug(term)}/`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url).join("\n")}\n</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
