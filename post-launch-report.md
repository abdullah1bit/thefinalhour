# Post-Launch & SEO Audit Report

## 1. Critical SEO Blockers
- **Duplicate Metadata & Canonical URLs (SPA Issue):** The application is a Client-Side Rendered (CSR) Vite SPA. The `index.html` contains static `<title>`, `<meta name="description">`, `<meta property="og:*">`, and a static `<link rel="canonical" href="/" />`. Since these are not dynamically updated via a library (like `react-helmet-async`), search engines will see all routes (e.g., `/timeline`, `/glossary`) as duplicates of the homepage.
- **Dynamic Content Indexing:** Without Server-Side Rendering (SSR) or dynamic meta tags, social sharing cards for deep links will always show the homepage preview.

*(Note: `robots.txt` and `sitemap.xml` are correctly configured to allow indexing).*

## 2. Monitoring Gaps
- **Analytics Missing:** No front-end web analytics tracking scripts (e.g., Google Analytics, Plausible, PostHog) are initialized in the application or `index.html`.
- **Error Tracking Missing:** No production error-tracking tool (e.g., Sentry, LogRocket, Datadog) is configured to catch client-side or backend crashes. The production environment is flying blind to runtime errors encountered by end users.

## 3. Performance Tweaks
- **Image Lazy Loading:** Found several `<img />` tags in components (`TimelineNode.tsx`, `ExpandableSignCard.tsx`, `MajorSignCard.tsx`) that include proper `alt` attributes but lack modern loading optimizations. Add `loading="lazy"` to images below the fold to improve initial page load speed.
- **Missing Caching Headers:** The `vercel.json` configuration establishes SPA routing but does not explicitly set `Cache-Control` headers for static assets. This can result in suboptimal load times and Core Web Vitals if edge caching isn't optimally leveraging immutability.

## 4. Action Plan
- [ ] **SEO (Highest Priority):** Install and configure a meta-tag manager (e.g., `react-helmet-async`) in the web application to dynamically update the `<title>`, description, canonical URL, and Open Graph tags based on the active route.
- [ ] **Monitoring:** Set up and integrate a privacy-friendly analytics tracker (e.g., Plausible or PostHog) and include the initialization script in `index.html` or the main layout.
- [ ] **Error Tracking:** Install an error tracker like Sentry in both the React `webapp` and the Hono `backend` to trace production exceptions.
- [ ] **Performance:** Review all `<img />` tags throughout the `webapp/src/components` directory and add `loading="lazy"` where appropriate.
- [ ] **Security & Caching:** Update `vercel.json` to include `"headers"` for `Cache-Control` on static assets, and add standard HTTP security headers (`Strict-Transport-Security`, `Content-Security-Policy`, `X-Content-Type-Options`).
- [ ] **Environment Structure:** Ensure there is a strict separation between `.env.development` and `.env.production` (verify via your hosting dashboard, as local `.env` files are correctly excluded from git).
