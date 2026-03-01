---
name: post-launch-auditor
description: Audits a newly deployed application for SEO, indexing, production monitoring, and performance standards. Use this when the user asks to "check post-launch tasks", "audit SEO", or "see if the site is ready for Google."
---
# Post-Launch & SEO Auditor

This skill conducts a strict review of the project's static assets, metadata, and configuration files to ensure the application is discoverable by search engines, performant, and properly monitored in production.

## Audit Workflow

Systematically analyze the codebase for the following production requirements. Do not write feature code; identify missing configurations and structural gaps.

### 1. Indexing & SEO (Discoverability)
* **Robots.txt & Sitemap:** Verify `robots.txt` exists and does *not* contain `Disallow: /` for production environments. Ensure a `sitemap.xml` is generated or statically present.
* **Canonical URLs:** Check that pages define canonical tags to prevent duplicate content penalties.
* **Meta Tags & Open Graph:** Scan the main HTML document or root layout (e.g., `layout.tsx`, `index.html`) for dynamic `<title>`, `<meta name="description">`, and `og:` (Open Graph) tags for social sharing.
* **Semantic HTML:** Ensure the app utilizes proper header hierarchies (`<h1>`, `<h2>`) rather than just styled `<div>` elements, which hurts accessibility and SEO.

### 2. Production Monitoring & Analytics
* **Analytics Implementation:** Check for the presence of web analytics tracking codes (e.g., Google Analytics, Plausible, PostHog). 
* **Error Tracking:** Verify if a production error-tracking tool (e.g., Sentry, LogRocket, or Datadog) is initialized to catch client-side crashes that the user won't report.
* **Console Logs:** Flag any remaining `console.log()` statements that should be removed or replaced with a proper logging library in production.

### 3. Performance & Asset Optimization
* **Asset Loading:** Check if images are using modern formats (WebP/AVIF), include `alt` text, and implement lazy loading where appropriate.
* **Caching Headers:** Review server or hosting configuration files (e.g., `next.config.js`, `vercel.json`, `netlify.toml`) for proper Cache-Control headers on static assets.

### 4. Security & Live Configuration
* **Environment Variables:** Ensure there is a clear distinction between `.env.development` and `.env.production` requirements. 
* **Security Headers:** Look for configured HTTP security headers (Content-Security-Policy, X-Frame-Options, Strict-Transport-Security).

## Output Format

Generate a strict `post-launch-report.md` with the following structure:
1. **Critical SEO Blockers:** Things preventing the site from being indexed (e.g., bad robots.txt, missing meta tags).
2. **Monitoring Gaps:** Missing analytics or error tracking.
3. **Performance Tweaks:** Quick wins for Core Web Vitals (image optimization, caching).
4. **Action Plan:** A prioritized checklist of files to update before announcing the launch.

*Remember: Your role is Release Manager. Focus on what makes a site survive and thrive in the wild.*