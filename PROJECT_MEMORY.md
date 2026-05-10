[PROJECT_MEMORY]

## Architecture & Technology Stack
- **Framework:** Next.js 15+ (App Router, Turbopack enabled)
- **Language:** TypeScript across frontend and backend.
- **ORM & Database:** Prisma ORM. Currently configured to use local SQLite (`dev.db`), with plans to migrate to a scalable edge-friendly provider (like Turso/libSQL or a hosted Postgres) before production. Prisma is pinned to `^5.14.0` to avoid SQLite lock contention issues in newer versions during testing.
- **Authentication:** NextAuth.js configured with a custom Credentials provider. It uses a Next.js Middleware/Proxy pattern (`src/proxy.ts` required due to Turbopack edge constraints) to secure `(dashboard)` routes and redirect unauthenticated users to `/auth/signin`.
- **Styling & UI:** Tailwind CSS v4, adhering to a strict luxury theme palette (Black/Blue/Gold).

## Core Patterns & Conventions
- **Server Actions over API Routes:** For data mutations (e.g., adding a lead, creating a deal), the project uses Next.js Server Actions placed in the same component file or near the views rather than traditional REST API `/api/...` routes. This streamlines data flow and leverages `revalidatePath` for optimistic UI updates.
- **Input Validation (Zod):** Zod schemas are now defined in `src/lib/validations/` (e.g., `lead.ts`, `deal.ts`, `contact.ts`, `task.ts`) and actively utilized within Server Actions to rigorously parse and validate incoming `FormData` before hitting Prisma. Error strings are passed back to client components for display.
- **Suspense Boundaries:** Extensive use of `React.Suspense` is required, especially around components that consume `useSearchParams` or deal with client-side URL parameters, as enforced by Next.js 15 strict mode.
- **Component Colocation:** Modals and specific UI components (like `AddLeadModal.tsx`) are colocated near the views that use them or in a shared `src/components` directory. Modals handle error state rendering derived from their paired Server Action.
- **Navigation:** Strict usage of Next.js `<Link>` components over raw HTML `<a>` tags to enable prefetching and smooth SPA-like transitions within the App Router.

## Data Models (Prisma Schema)
- **User & Workspace:** Foundational multi-tenant structure. Users belong to a Workspace.
- **CRM Entities:**
  - `Lead`: Potential clients, tracked by status (e.g., NEW, CONTACTED).
  - `Contact`: Established relationships.
  - `Deal`: Transactions tracked through a pipeline (e.g., PROSPECTING, UNDER_CONTRACT, CLOSED). Linked to a Contact.
  - `Task`: Action items assigned to Users, linked to Workspaces. Status tracked via `TODO`, `IN_PROGRESS`, `DONE`.

## Recent Architectural Decisions & Workarounds
- **Zod Integration:** Zod was fully integrated to secure Server Action mutations. Client modals were updated to display validation errors (`{ error: string }`) returned from these actions instead of failing silently.
- **Dynamic Dashboard Metrics:** The dashboard (`src/app/(dashboard)/page.tsx`) was updated to dynamically pull actual aggregate counts (`prisma.lead.count()`, `prisma.deal.findMany()` summing values) instead of rendering static mock data.
- **Middleware Proxy Pattern:** Created `src/proxy.ts` to handle NextAuth middleware logic because Next.js 15 Turbopack has known edge-runtime compilation issues with the standard `middleware.ts` when using certain Node.js core modules.

## Roadmap & Future Directions
- **Feature Expansion (Phase 2):** Introduce dynamic filtering/sorting for data tables via URL params. Add activity timelines for entities.
- **Workflow Engine & Client Portal:** Focus on automation and client-facing interfaces (e.g., a magic-link driven portal for buyers/sellers to track deal progress).
- **AI Integrations (Phase 3):** Introduce conversational interfaces and AI lead qualification, requiring integration with LLM providers (OpenAI/Anthropic) and potentially Vector DBs for RAG over CRM notes.
