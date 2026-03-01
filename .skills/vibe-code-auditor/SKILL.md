---
name: vibe-code-auditor
description: Comprehensive pre-launch audit for AI-generated/vibe-coded projects. Use this skill when the user asks to "audit the codebase", "check for gaps before launch", or "review vibe coding best practices". Checks for security vulnerabilities, edge-case handling, and architectural consistency.
---
# Vibe Code Pre-Launch Auditor

This skill conducts a strict, multi-pass audit of the codebase to identify common flaws introduced by LLM agent coding (vibe coding). 

## Audit Workflow

When asked to audit a project, systematically perform the following checks. Do not write new feature code; focus exclusively on identifying gaps, vulnerabilities, and inconsistencies.

### 1. Security & Secrets (The "Must-Pass" Check)
* **Hardcoded Secrets:** Scan for API keys, passwords, or tokens in frontend code and un-gitignored files.
* **Input Validation:** Verify that all user inputs (forms, API routes) are validated strictly on the backend (e.g., Zod, Joi) and not just the frontend.
* **SQL/NoSQL Injection:** Ensure all database queries use parameterized statements or ORMs properly.
* **Auth Holes:** Check that protected routes actually verify session/token validity and user authorization roles.

### 2. Edge Cases & Error Swallowing
* **Silent Failures:** Search for empty `catch` blocks or instances of just `console.log(error)` without returning proper HTTP status codes to the client.
* **Loading/Error States:** Verify the UI handles pending API requests and displays user-friendly error boundaries.
* **Missing Data:** Check how components render if database queries return `null`, `undefined`, or empty arrays.

### 3. Architecture & Code Duplication
* **The "AI Amnesia" Check:** Look for reinvented utility functions. Identify if the AI created the same logic (like `formatDate` or API fetch wrappers) in three different files instead of using a shared utility.
* **N+1 Queries:** Review database fetching logic in loops to prevent the app from crashing under real-world load.
* **Dead Code:** Identify unused imports, leftover console logs, and orphaned components generated during early prototyping.

## Output Format

Generate a strict `audit-report.md` with the following structure:
1. **Critical Blockers:** Security risks and app-crashing bugs (must fix before launch).
2. **Structural Gaps:** Missing error handling, unvalidated inputs, and missing edge-case UI.
3. **Technical Debt:** Duplicated code and performance bottlenecks.
4. **Action Plan:** A prioritized checklist of exactly what files to fix.

*Remember: Your role is Senior QA Architect. Be ruthless but constructive. Do not fix the code automatically; report it first.*