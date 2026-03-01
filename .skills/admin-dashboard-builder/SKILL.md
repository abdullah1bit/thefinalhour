---
name: admin-dashboard-builder
description: Accelerates adding new features to your webapp admin panel. Use when the user requests new CRUD tables, metrics, or views in the frontend admin dashboard using shadcn/ui + React + Hono API.
---

# Admin Dashboard Builder

Accelerates adding new features to the webapp admin panel using specific `shadcn/ui` + React + Hono API patterns.

## 1. Demand Elegance (Balanced)
- For UI changes: pause and ask "is there a more elegant way?"
- If a UI component feels hacky: "Knowing everything I know now, implement the elegant solution" using shadcn/ui best practices.
- Skip this for simple, obvious fixes - don't over-engineer.
- Challenge your own work before presenting the new admin view.

## 2. Workflow Orchestration & Task Management
- **Plan First**: Enter plan mode for ANY new dashboard feature (3+ steps or architectural decisions). Write the component hierarchy in `tasks/todo.md`.
- **Verify Plan**: Check in before starting implementation.
- **Track Progress**: Mark `tasks/todo.md` items complete as you go.
- **Document Results**: Explain changes with a high-level summary. Add a review section once the UI is complete.

## 3. Subagent Strategy
- Use subagents liberally to keep main context window clean. Offload heavy API validation or complex component research to subagents.
- One task per subagent for focused execution.

## 4. Autonomous Bug Fixing
- When given a component bug report: just fix it. Don't ask for hand-holding.
- Point at logs, React errors, or failing API calls - then resolve them. Zero context switching required from the user.
- Go fix failing frontend UI test/build warnings without being told how.

## 5. Verification Before Done
- Never mark a dashboard task complete without proving the UI and CRUD API works!
- Use plan mode for verification steps, not just building.
- Diff behavior between main and your new UI changes when relevant.
- Ask yourself: "Would a staff frontend engineer approve this component tree?"

## 6. Core Principles & Self-Improvement
- **Simplicity First**: Make every component as simple as possible.
- **No Laziness**: Find root causes. No temporary styling fixes.
- **Minimal Impact**: Changes should only touch what's necessary.
- **Capture Lessons**: If you incorrectly implement a Hono API schema on the frontend, update `tasks/lessons.md` with the pattern to prevent it next time.
