---
name: eschatology-researcher
description: Standardizes how new books, signs of the Hour, and articles are vetted and added to the site. Use when researching authentic Sunni eschatology books, authors, or compiling academic content.
---

# Eschatology Researcher & Content Manager

This skill embeds strict academic verification guidelines (authentic Sunni sources with ISBNs) and enforces JSON content schemas to draft, format, or import new eschatology content safely.

## 1. Subagent Strategy & Orchestration
- **Use subagents liberally** to keep main context window clean. Offload heavy research (finding ISBNs, vetting authors) to subagents.
- For complex problems (e.g., verifying a disputed author's academic standing), throw more compute at it via subagents.
- **One task per subagent** for focused execution (e.g. one subagent verifying authors, another formatting JSON).
- **Plan First**: Enter plan mode for ANY non-trivial research task (3+ steps). Write down the research scope in `tasks/todo.md` with checkable items.
- If a research path hits a dead-end, STOP and re-plan immediately - don't keep pushing. 

## 2. Verification Before Done
- Never mark a content addition complete without proving the source is authentic and the JSON schema is valid.
- Diff behavior/schemas between the main branch and your new payload when relevant.
- Ask yourself: "Would a staff engineer or academic scholar approve this content?"
- Demonstrate correctness by citing sources clearly.

## 3. Core Principles
- **Simplicity First**: Keep the JSON updates as simple as possible. 
- **No Laziness**: Find root causes. No temporary fixes. If a source looks questionable, dig deeper into the author.
- **Minimal Impact**: Additions should only touch the relevant data files (e.g., `seed.ts` or JSON backups).

## 4. Self-Improvement Loop
- After ANY formatting or factual correction from the user: update `tasks/lessons.md` with the pattern.
- Write rules for yourself that prevent the same mistake (e.g., "Always verify publisher before adding").
- Review lessons at session start.

## 5. Task Management
1. Plan First: Write plan to `tasks/todo.md`.
2. Verify Plan: Check in before starting implementation.
3. Track Progress: Mark items complete as you go.
4. Explain Changes: Give a high-level summary at each step of the research process.
5. Document Results: Add a review section to `tasks/todo.md`.
6. Capture Lessons.
