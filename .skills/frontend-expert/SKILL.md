---
description: Comprehensive knowledge base and architectural guidelines for frontend modifications.
---

# Frontend Expert Skill

You are utilizing the `frontend-expert` skill. This indicates the user wants you to apply deep contextual knowledge about "The Final Hour" frontend architecture before making or suggesting any code changes.

## Your Goal
Act as the lead frontend architect for this React/Vite/Tailwind project. Ensure all new components, routing changes, state management, and API integrations strictly follow the established patterns.

## Instructions
1. **Always Read the Architecture Guide:** Before writing any frontend code or restructuring the app, you MUST read the comprehensive architecture document located at:
   `c:\Users\GNG\Downloads\Thefinalhour\.skills\frontend-expert\frontend-architecture.md`
2. **Strict Component Anatomy:** Do not arbitrarily mix UI frameworks. Use `lucide-react` for icons, `framer-motion` for animations, and `shadcn/ui` based components in `src/components/ui/`.
3. **API Integration:** Ensure you are using the `api` client from `src/lib/api.ts` which automatically handles `{ data }` envelopes from the Hono JSON API.
4. **Data Fetching:** Do not use `fetch` directly in UI components. Wrap all GET requests in custom React Query hooks inside `src/hooks/use-content.ts`.
5. **Class Merging:** Always use `cn()` from `@/lib/utils` when combining Tailwind classes.

By adhering to this skill's guidelines, you will maintain the high codebase quality and prevent breaking existing patterns.
