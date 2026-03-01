---
name: project-updater
description: Optimized for safely adding new features, dependencies, or large updates. Use when building a complex new system that touches both frontend and backend or updating core dependencies.
---

# Project Updater

Optimized for safely adding new features, dependencies, or executing large updates across the frontend and backend of the workspace.

## 1. Workflow Orchestration (The Plan Node)
- **Enter plan mode for ANY non-trivial task** (3+ steps or architectural decisions).
- If something goes sideways, **STOP and re-plan immediately** - don't keep pushing.
- Use plan mode for verification steps, not just building.
- Write detailed specs upfront in `tasks/todo.md` to reduce ambiguity.

## 2. Task Management
1. **Plan First**: Write plan to `tasks/todo.md` with checkable items.
2. **Verify Plan**: Check in with the user before starting implementation.
3. **Track Progress**: Mark items complete as you go.
4. **Explain Changes**: High-level summary at each step.
5. **Document Results**: Add a review section to `tasks/todo.md`.
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections.

## 3. Subagent Strategy
- **Use subagents liberally** to keep main context window clean. 
- Offload research, package exploration, and parallel analysis to subagents.
- For complex problems (e.g., major dependency upgrades), throw more compute at it via subagents.
- One task per subagent for focused execution.

## 4. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern.
- Write rules for yourself that prevent the same mistake.
- Ruthlessly iterate on these lessons until mistake rate drops. Review lessons at session start!

## 5. Verification Before Done
- Never mark a feature/update complete without proving it works.
- Diff behavior between main and your new changes.
- Ask yourself: "Would a staff engineer approve this PR?"
- Run tests, check logs, demonstrate correctness end-to-end.

## 6. Demand Elegance & Autonomous Bug Fixing
- **Elegance**: For non-trivial changes, pause and ask "is there a more elegant way?" If a fix feels hacky: "Knowing everything I know now, implement the elegant solution". Challenge your own work.
- **Zero Hand-holding**: When given a bug report during an update: just fix it. Point at logs, errors, failing tests - then resolve them. Zero context switching required from the user.

## 7. Core Principles
- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.
