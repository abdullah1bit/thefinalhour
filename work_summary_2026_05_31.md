# Work Summary - 2026-05-31

- Audited the public repository surface for tracked env files, hardcoded service credentials, default admin credentials, and local database files.
- Removed tracked env files and the local Prisma database from the working tree.
- Added safe backend and webapp env examples plus root ignore rules.
- Reworked admin seed scripts to require private `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
- Removed the hardcoded production database URL from `backend/seed-prod.ts`.
- Added root project documentation and a security policy for public contributors.
- Added external contribution guidance and ignored internal agent/maintenance files.
- Updated setup/maintenance docs to match PostgreSQL and private credential handling.
- Ran backend and webapp TypeScript checks successfully.
