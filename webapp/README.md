# The Final Hour — Islamic Eschatology Timeline

An educational, informational website exploring the signs of the end times in Islam. Based on authentic hadith and Quranic sources.

## Overview

A production-ready informational website presenting Islamic eschatology in a respectful, educational manner. The homepage is a single-page storytelling experience covering fulfilled signs, unfolding signs, major signs, and modern interpretations. All content is managed through a secure admin panel backed by a database.

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Single-page storytelling: hero, foundation, fulfilled signs, unfolding signs, major signs, interpretations, featured verse |
| `/timeline` | Timeline | Visual vertical timeline/flowchart of all events |
| `/glossary` | Glossary | Key terms, Quranic verses, scholarly works |
| `/admin/login` | Admin Login | Secure email/password authentication |
| `/admin` | Admin Dashboard | Content counts and quick links |
| `/admin/signs` | Manage Signs | CRUD for minor signs (fulfilled/unfolding) |
| `/admin/major-signs` | Manage Major Signs | CRUD with nested details |
| `/admin/glossary` | Manage Glossary | CRUD for glossary terms |
| `/admin/verses` | Manage Verses | CRUD for Quranic verses |
| `/admin/scholarly-works` | Manage Scholarly Works | CRUD for scholarly works |
| `/admin/timeline` | Manage Timeline | CRUD for timeline events |
| `/admin/interpretations` | Manage Interpretations | CRUD for modern interpretations |
| `/admin/banners` | Manage Banners | Announcement banners with variants |
| `/admin/settings` | Site Settings | Site title, tagline, featured verse |
| `/admin/change-password` | Change Password | Update admin password |
| `/admin/backup` | Backup & Restore | Export/import all content as JSON |

## Tech Stack

- **Frontend**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Data Fetching**: TanStack React Query
- **Icons**: lucide-react
- **Backend**: Hono + Bun (port 3000)
- **Database**: SQLite via Prisma ORM
- **Auth**: Better Auth (email/password, admin roles)

## Features

- **Storytelling homepage** with smooth scroll, expandable cards, section progress nav
- **Admin panel** with full CRUD for all content types
- **Source links** on all content types (optional link to external sources/further reading)
- **Image upload** for signs, major signs, and timeline events with crop/fit/position settings
- **Announcement banners** (default, warning, success, donation variants)
- **Site settings** management (title, tagline, featured verse)
- **Search** across all content types (Ctrl+K / Cmd+K)
- **Content backup** (JSON export/import)
- **Password management** for admin users
- **Global error handling** with proper HTTP status codes
- **Database indexes** on foreign keys for performance

## Design System

- **Theme**: Dark green-black background with gold/amber accents
- **Fonts**: Cormorant Garamond (headings), DM Sans (body), Amiri (Arabic text)
- **Color Coding**:
  - Green (`fulfilled`) — Historical signs already happened
  - Gold (`unfolding`) — Present trends continuing
  - Red (`approaching`) — Major signs yet to come

## Project Structure

```
webapp/src/
├── components/
│   ├── layout/              # Navbar, Footer, SectionDivider
│   ├── home/                # HeroSection, FeaturedVerse, AnnouncementBar, DisclaimerBanner
│   ├── homepage/            # FoundationSection, FulfilledSection, UnfoldingSection, MajorSignsSection, InterpretationsSection, HomepageProgressNav, BottomCTA
│   ├── signs/               # SignCard, MajorSignCard
│   ├── timeline/            # TimelineNode, Legend
│   ├── glossary/            # GlossaryTermCard, VerseCard, ScholarlyWorkCard
│   ├── SearchDialog.tsx     # Global search command palette
│   └── ui/                  # shadcn/ui components
├── pages/
│   ├── Index.tsx            # Homepage
│   ├── Timeline.tsx         # Timeline page
│   ├── Glossary.tsx         # Glossary page
│   └── admin/               # Admin panel pages
├── hooks/
│   └── use-content.ts       # React Query hooks for all API endpoints
├── lib/
│   ├── api.ts               # API client with auto-unwrap envelope
│   ├── auth-client.ts       # Better Auth client
│   ├── types.ts             # TypeScript interfaces
│   └── utils.ts             # Utilities
```

```
backend/
├── prisma/
│   └── schema.prisma        # Database schema (14 models)
├── src/
│   ├── index.ts             # Hono app, CORS, global error handler
│   ├── env.ts               # Environment validation
│   ├── types.ts             # Zod schemas (shared contracts)
│   ├── lib/
│   │   ├── auth.ts          # Better Auth config
│   │   └── prisma.ts        # Prisma client
│   ├── middleware/
│   │   └── requireAdmin.ts  # Admin auth middleware
│   └── routes/
│       ├── admin.ts         # Admin CRUD + password change + export/import
│       ├── auth.ts          # Better Auth routes
│       ├── content.ts       # Homepage data endpoint
│       ├── search.ts        # Public search endpoint
│       ├── signs.ts         # Public signs API
│       ├── major-signs.ts   # Public major signs API
│       ├── glossary.ts      # Public glossary API
│       ├── verses.ts        # Public verses API
│       ├── scholarly-works.ts
│       ├── timeline.ts
│       ├── interpretations.ts
│       └── site.ts          # Public banners + settings
```

## API Endpoints

### Public
- `GET /api/content/homepage` — All homepage data in one call
- `GET /api/signs` — All signs (optional `?status=` filter)
- `GET /api/major-signs` — All major signs with details
- `GET /api/glossary` — All glossary terms
- `GET /api/verses` — All Quranic verses
- `GET /api/scholarly-works` — All scholarly works
- `GET /api/timeline` — All timeline events
- `GET /api/interpretations` — All interpretations
- `GET /api/site/banner` — Active banners
- `GET /api/site/settings` — Site settings
- `GET /api/search?q=...` — Search across all content

### Admin (requires authentication)
- `POST/PUT/DELETE /api/admin/signs/:id`
- `POST/PUT/DELETE /api/admin/major-signs/:id`
- `POST/PUT/DELETE /api/admin/glossary/:id`
- `POST/PUT/DELETE /api/admin/verses/:id`
- `POST/PUT/DELETE /api/admin/scholarly-works/:id`
- `POST/PUT/DELETE /api/admin/timeline/:id`
- `POST/PUT/DELETE /api/admin/interpretations/:id`
- `POST/PUT/DELETE /api/admin/banners/:id`
- `GET/PUT /api/admin/settings`
- `PUT /api/admin/change-password`
- `GET /api/admin/export`
- `POST /api/admin/import`

## Admin Credentials

- Email: `admin@thefinalhour.com`
- Password: `admin123` (change immediately in production)

## Content Guidelines

- Sober, respectful, educational tone — not sensationalist
- No human figures (respectful of aniconic preferences)
- No date predictions (forbidden in Islam)
- Multiple scholarly opinions presented where they differ
- Disclaimer: "Only Allah knows the unseen"
- All content sourced from authentic hadith collections and Quranic verses
