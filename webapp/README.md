# The Final Hour — Islamic Eschatology Timeline

An educational, informational website exploring the signs of the end times in Islam. Based on authentic hadith and Quranic sources.

## Overview

This is a production-ready informational website (not a business) that presents Islamic eschatology in a respectful, educational manner. It covers three categories of prophetic signs: fulfilled, unfolding, and approaching.

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with hero, navigation gates, and overview |
| `/foundation` | The Foundation | What is Islamic eschatology, the three categories of signs |
| `/fulfilled` | Signs That Have Come True | 11 historical signs grouped by era |
| `/unfolding` | Signs Unfolding Now | 24 present-day signs across 4 categories with filtering |
| `/major-signs` | The Major Signs | 10 major approaching signs with expandable detail cards |
| `/timeline` | The Sequence | Visual vertical timeline/flowchart of all events |
| `/interpretations` | Modern Interpretations | Contemporary scholarly theories with cautions |
| `/glossary` | Glossary & References | Key terms, Quranic verses, scholarly works |

## Tech Stack

- **Frontend**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Icons**: lucide-react
- **Backend**: Hono (port 3000) — minimal, used for API if needed

## Design System

- **Theme**: Dark green-black background with gold/amber accents
- **Fonts**: Cormorant Garamond (headings), DM Sans (body), Amiri (Arabic text)
- **Color Coding**:
  - Green (`fulfilled`) — Historical signs already happened
  - Gold (`unfolding`) — Present trends continuing
  - Red (`approaching`) — Major signs yet to come
- **Patterns**: Islamic geometric pattern overlays via CSS utility classes

## Project Structure

```
webapp/src/
├── data/                    # Content data (no hardcoded strings in components)
│   ├── types.ts             # TypeScript interfaces
│   ├── fulfilled-signs.ts   # 11 historical signs
│   ├── unfolding-signs.ts   # 24 present-day signs
│   ├── major-signs.ts       # 10 major approaching signs
│   ├── glossary.ts          # Terms, verses, works, interpretations
│   └── timeline-sequence.ts # 12 timeline events
├── components/
│   ├── layout/              # Navbar, Footer, PageWrapper, StatusBadge, SectionDivider
│   ├── home/                # Landing page sections
│   ├── foundation/          # Foundation page components
│   ├── signs/               # SignCard, MajorSignCard, CategoryOverviewCard
│   ├── timeline/            # TimelineNode, Legend, EndMarker
│   ├── glossary/            # GlossaryTermCard, VerseCard, ScholarlyWorkCard
│   ├── interpretations/     # InterpretationCard
│   └── ui/                  # shadcn/ui components
├── pages/                   # Route pages
└── lib/                     # Utilities (cn, api client)
```

## Content Guidelines

- Sober, respectful, educational tone — not sensationalist
- No human figures (respectful of aniconic preferences)
- No date predictions (forbidden in Islam)
- Multiple scholarly opinions presented where they differ
- Disclaimer: "Only Allah knows the unseen"
- All content sourced from authentic hadith collections and Quranic verses
