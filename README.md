# The Final Hour

The Final Hour is an educational website that presents Islamic eschatology in a clear, sequential format for general readers.

The project gathers signs of the Hour, major events, glossary terms, Qur'anic verses, scholarly works, and interpretive notes into one browsable experience. The goal is not to issue predictions or replace scholarship. It is to make sourced material easier to explore, compare, and keep updated as better references, lectures, and scholarly explanations are added.

## Why This Exists

Most information about Islamic end-times material is scattered across books, lectures, articles, and informal posts. This project aims to organize that material into an accessible public resource:

- Sequential presentation of fulfilled, unfolding, and major signs
- Source links for deeper reading
- Admin tools for maintaining content without editing code
- A glossary and references section for general readers
- A foundation for adding stronger scholarly review over time

## Project Structure

```
webapp/   React + Vite frontend and admin panel
backend/  Hono + Bun API, Prisma models, Better Auth
```

The frontend uses relative `/api/...` URLs in production so it can work behind common reverse proxies and deployment platforms.

## Safety And Scholarly Notes

- No date predictions should be added.
- Content should stay sober, sourced, and non-sensational.
- Where scholars differ, multiple views should be represented clearly.
- "Only Allah knows the unseen" should remain the guiding disclaimer.
- This project is for public education, not formal religious verdicts.

## Local Setup

Copy the example environment files and fill in private values locally:

```bash
cp backend/.env.example backend/.env
cp webapp/.env.example webapp/.env
```

Do not commit real `.env` files, database files, API keys, admin passwords, or exported backups.

For contribution workflow and content guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Open Source Readiness

This repository is being prepared for public collaboration and OpenAI open source support. Immediate priorities are:

- Replace exposed local secrets with example env files
- Improve documentation for contributors and reviewers
- Expand the content model with stronger source linkage
- Add more authoritative scholarly material and lecture references
- Keep maintenance simple enough for non-developers through the admin panel
