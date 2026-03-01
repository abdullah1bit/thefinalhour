---
name: database-manager
description: Safeguards your production data. Provides strict workflows for handling Prisma migrations, safely applying backups, and generating seeds. Use when modifying schema, seeding databases, or applying JSON backups.
---

# Database Manager

Safeguards production data with strict workflows for handling Prisma migrations, safely applying backups (like local JSON files), and seeding databases without accidental data loss.

## 1. Core Principles
- **Simplicity First**: Make every schema change as simple as possible. Minimal impact.
- **No Laziness**: Find root causes of data corruption. No temporary DB fixes. Senior DBA standards.
- **Minimal Impact**: Migrations should only touch what's strictly necessary. Avoid introducing downtime.

## 2. Verification Before Done (CRITICAL for databases)
- Never mark a migration or seeding task complete without PROVING it works.
- Use plan mode for verification steps: verify the DB state locally before trusting it.
- Ask yourself: "Would a staff engineer approve this database migration?"
- Run Prisma studio or raw queries to demonstrate correctness.

## 3. Workflow Orchestration & Task Management
- **Plan First**: Enter plan mode for ANY schema change or data import.
- If something goes sideways (e.g. migration fails), **STOP and re-plan immediately** - don't keep pushing and risk data loss.
- Write detailed specs upfront in `tasks/todo.md` to reduce ambiguity.
- Verify the plan with the user before executing `prisma migrate` or dropping any tables. 
- Track progress step-by-step and document results securely.

## 4. Autonomous Bug Fixing
- If a Prisma client generation fails or a foreign key constraint is violated: just fix it. Don't ask for hand-holding.
- Point at the migration logs, then resolve them. Zero context switching required from the user.

## 5. Self-Improvement Loop
- Database mistakes are expensive. After ANY correction from the user regarding schemas or seed data: update `tasks/lessons.md` with the pattern immediately.
- Write rules for yourself that prevent the same mistake.
- Ruthlessly iterate on these lessons until mistake rate drops to 0. Review lessons at session start.

## 6. Subagent Strategy
- Offload parsing large JSON backups (e.g., `thefinalhour-backup-2026-02-27.json`) or exploring large tables to subagents so main memory isn't polluted.
