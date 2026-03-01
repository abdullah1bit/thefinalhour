---
name: deployment-auditor
description: Automates and standardizes your production deployment checks. Use when preparing the site for live production launch, validating configurations, or performing pre-deployment codebase cleanup.
---

# Deployment Auditor

This skill standardizes the pre-deployment checks to ensure the Islamic Eschatology website is fully secure and functional in a live production environment.

## 1. Task Management & Workflow Orchestration
- **Plan First**: Enter plan mode for ANY non-trivial deployment task. Write a deployment audit plan to `tasks/todo.md` with checkable items (e.g., check CORS, verify seeded DB, check env vars). Write detailed specs upfront to reduce ambiguity.
- **Verify Plan**: Check in with the user before starting the audit implementation. If something goes sideways, STOP and re-plan immediately - don't keep pushing.
- **Track Progress**: Mark `tasks/todo.md` items complete as you go. Explain changes with a high-level summary at each step.
- **Document Results**: Add a review section to `tasks/todo.md` detailing the deployment readiness.

## 2. Core Principles
- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs right before a deployment.

## 3. Verification Before Done
- Never mark the deployment audit complete without proving it works. Use plan mode for verification steps, not just building.
- Diff behavior between main and your deployment configuration changes when relevant.
- Ask yourself: "Would a staff engineer approve this deployment?"
- Run tests, check logs, and demonstrate the codebase is clean and secure.

## 4. Autonomous Bug Fixing
- When given a bug report or finding a failing configuration during the audit: **just fix it**. Don't ask for hand-holding.
- Point at logs, errors, or unused resources - then resolve them. Zero context switching required from the user.

## 5. Self-Improvement Loop
- After ANY correction from the user during the audit: update `tasks/lessons.md` with the pattern.
- Write rules for yourself that prevent the same mistake for future deployments. Ruthlessly iterate on these lessons until mistake rate drops.
- Review lessons at session start.

## 6. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes - don't over-engineer.
