# The Final Hour: Frontend Architecture Guide

This document provides a comprehensive overview of the frontend architecture for "The Final Hour" project. It is intended to serve as the primary context for developers and AI agents working on the codebase.

## 1. Tech Stack
*   **Core:** React 18, TypeScript, Vite
*   **Routing:** React Router v6 (`react-router-dom`)
*   **State Management & Data Fetching:** TanStack Query (React Query) v5
*   **Styling & UI:** Tailwind CSS, shadcn/ui components, `lucide-react` icons
*   **Animations:** Framer Motion
*   **Forms:** React Hook Form + Zod validation
*   **Authentication Client:** Better Auth (`better-auth/client`)

## 2. Directory Structure
The frontend code resides entirely within the `/webapp` directory.

*   `src/components/`: Reusable UI components.
    *   `admin/`: Specialized components for the admin dashboard (e.g., `VisitorStats.tsx`).
    *   `home/`, `homepage/`: Components specific to the public landing page.
    *   `layout/`: Global layout wrappers (`Navbar.tsx`, `Footer.tsx`, `PageWrapper.tsx`).
    *   `timeline/`: Specialized components for the Timeline feature.
    *   `ui/`: Generic shadcn/ui atomic components (buttons, dialogs, inputs).
*   `src/hooks/`: Custom React hooks, primarily wrapping React Query (e.g., `use-content.ts`).
*   `src/lib/`: Core utilities and configuration.
    *   `api.ts`: Custom `fetch` wrapper handling base URLs, envelopes, and errors.
    *   `auth-client.ts`: Instantiation of the Better Auth client.
    *   `types.ts`: TypeScript interfaces mirroring the Prisma backend models.
    *   `utils.ts`: Tailwind generic class merger (`cn()`).
*   `src/pages/`: Top-level route components.
    *   `admin/`: All admin-level views.

## 3. Routing Architecture (`App.tsx`)
Routing is strictly defined in `src/App.tsx` using `BrowserRouter`.

*   **Public Routes:** Rendered with standard `Navbar` and `Footer` wrappers. (e.g., `/`, `/timeline`, `/glossary`).
*   **Admin Routes:** Nested under `/admin`. Protected by a custom root-level `AdminLayout.tsx` which enforces authentication session checks before rendering child routes via `<Outlet />`.
*   **Tracking:** A custom `PageTracker` component listens to route changes and pings the `/api/analytics/track` backend endpoint for all non-admin routes.

## 4. API Communication (`api.ts`)
The `src/lib/api.ts` utility is the backbone of frontend-backend communication. 

*   **Crucial Pattern:** The backend Hono API wraps almost all successful JSON responses in a `{ data: T }` envelope. The `api.ts` client automatically unwraps this envelope. Therefore, frontend code requesting `api.get<User>('/url')` receives exactly a `User` object, *not* `{ data: User }`.
*   **Error Handling:** HTTP non-200 responses are automatically transformed into `ApiError` instances containing standard error messages, enabling easy `try/catch` and React Query error state handling.
*   **Proxying:** During local development, Vite proxies all requests starting with `/api` to the backend running on port 3000 (configured in `vite.config.ts`).

## 5. Data Fetching Strategy
We exclusively use **TanStack Query** for fetching, caching, and synchronizing asynchronous state. 

*   All queries are neatly abstracted into custom hooks inside `src/hooks/use-content.ts` (e.g., `useHomepageContent()`, `useTimelineEvents()`).
*   Components use these hooks instead of fetching data directly, ensuring standard caching intervals (`staleTime`) and automatic background refetching on window focus.
*   Mutations (Admin creation/edits) invalidate specific React Query keys to instantly refresh the UI.

## 6. Styling Conventions
*   **Tailwind Centralization:** The `tailwind.config.ts` extends themes heavily with semantic custom color variables (e.g., `bg-primary`, `text-muted-foreground`, `bg-fulfilled`, `text-unfolding`).
*   **Class Merging:** Always use the `cn()` utility function imported from `@/lib/utils` when concatenating standard Tailwind classes with conditional or prop-driven classes.
*   **Animations:** Stick to Framer Motion (`<motion.div>`) for complex structural entry animations. Use Tailwind's built-in transition utilities (`transition-colors duration-200`) for simple hover states.

## 7. The Timeline Feature Caveat
The `/timeline` route relies on manual event definitions in the database via the Admin panel. It does *not* automatically pull signs marked as "unfolding" or "fulfilled". It requests `TimelineEvent` records via standard API routes. The `StatusBadge` component maps string statuses strictly to localized Tailwind classes.

## 8. Development Commands
*   Run local server: `bun run dev` (starts on port 8000).
*   Type-checking: `tsc --noEmit` (handled broadly).
*   Build for Production: `vite build` or `bun run build`.
