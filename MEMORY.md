# MEMORY.md

## Core Architectural Knowledge

- **Framework:** Next.js 15+ (App Router, Turbopack)
- **Language:** TypeScript
- **Database:** Prisma ORM with SQLite (dev.db). Pinned to Prisma v5 to avoid edge-runtime/SQLite lock issues.
- **Auth:** NextAuth.js (Credentials provider). Note: Uses `src/proxy.ts` instead of standard `middleware.ts` due to Next.js 15 Turbopack edge-compilation limitations with Node core modules.
- **Styling:** Tailwind CSS v4. Theme: Luxury Black/Blue/Gold.

## Design Patterns

- **Data Mutations:** Prefer Next.js Server Actions colocated with components over traditional `/api` route handlers. Always use `revalidatePath` to trigger optimistic UI updates.
- **Routing:** Always use Next.js `<Link>` over standard `<a>` tags.
- **Client Components:** Ensure components using `useSearchParams` are wrapped in `<Suspense>` boundaries to satisfy Next.js strict mode.
- **Component Structure:** Keep UI modal logic close to the data-fetching views (e.g., `AddLeadModal` lives near `leads/page.tsx`).

## Current State (v0.16.0)

- MVP entities (Leads, Deals, Contacts, Tasks) are scaffolded and wired to Prisma.
- UI views and basic creation forms (Server Actions) exist for all MVP entities.
- Dashboard layout with NextAuth protection is fully functional.

## Immediate Development Priorities (TODO)

1. **Zod Validation:** Server Actions currently accept raw `FormData`. They must be refactored to use `zod` for strict schema validation.
2. **Dynamic Dashboard:** Replace hardcoded statistics on the main dashboard (`/`) with actual Prisma aggregation queries.
3. **UI Polish:** Implement Toast notifications (success/error) and loading states (e.g., `useFormStatus`) for all data mutation forms.
4. **Phase 2 Implementation:** Begin laying foundations for the Client Portal and Workflow Engine routing.

## Known Gotchas

- Do not upgrade Prisma to v6 without testing SQLite lock contention and NextAuth compatibility on Edge.
- When writing tests (e.g., Playwright), ensure dev server port conflicts are handled robustly (e.g., incrementing ports or killing stale processes gracefully).
- Avoid `killall node` as it terminates the AI agent's session. Target specific PIDs using `lsof -i :<port>`.
