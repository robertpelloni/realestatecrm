[PROJECT_MEMORY]

## Architecture & Technology Stack
- **Framework:** Next.js 15+ (App Router, Turbopack enabled)
- **Language:** TypeScript across frontend and backend.
- **ORM & Database:** Prisma ORM. Currently configured to use local SQLite (`dev.db`), with plans to migrate to a scalable edge-friendly provider (like Turso/libSQL or a hosted Postgres) before production. Prisma is pinned to `^5.14.0` (resolving to `v5.22.0`) to avoid SQLite lock contention issues in newer versions during concurrent development and testing.
- **Authentication:** NextAuth.js configured with a custom Credentials provider. It uses a Next.js Middleware/Proxy pattern (`src/proxy.ts` required due to Turbopack edge constraints) to secure `(dashboard)` routes and redirect unauthenticated users to `/auth/signin`.
- **Styling & UI:** Tailwind CSS v4, adhering to a strict luxury theme palette (Black/Blue/Gold).

## Core Patterns & Conventions
- **Server Actions over API Routes:** For data mutations (e.g., adding a lead, creating a deal, logging an activity, saving workflows), the project relies heavily on Next.js Server Actions placed in the same component file or within `src/lib/actions/`. This streamlines data flow and leverages `revalidatePath` for optimistic UI updates.
- **Input Validation (Zod):** Zod schemas are defined in `src/lib/validations/` (e.g., `lead.ts`, `deal.ts`, `workflow.ts`) and actively utilized within Server Actions to rigorously parse and validate incoming `FormData` before hitting Prisma. Error strings are passed back to client components for display.
- **Route Groups & Collisions:** The application uses route groups extensively (`(dashboard)`, `(portal)`). Because Next.js 15 throws build errors if two route groups resolve to the exact same root path, the portal was explicitly nested under `src/app/(portal)/portal/page.tsx` to prevent collision with `(dashboard)/page.tsx`.
- **Suspense Boundaries & Query Params:** Extensive use of `React.Suspense` is required around components that consume `useSearchParams`. List pages (Leads, Contacts, Tasks) use URL parameters (`?q=`, `?page=`, `?status=`) for advanced search, filtering, and server-side `take`/`skip` pagination.
- **Component Colocation & Error Handling:** Modals and specific UI components (like `AddLeadModal.tsx`) are colocated near their associated views. Modals handle error state rendering derived from their paired Server Action and emit success Toasts via `react-hot-toast` to provide non-blocking user feedback.
- **Navigation:** Strict usage of Next.js `<Link>` components over raw HTML `<a>` tags to enable prefetching and smooth SPA-like transitions within the App Router.

## Data Models (Prisma Schema)
- **User & Workspace:** Foundational multi-tenant structure. Users belong to a Workspace.
- **CRM Entities:**
  - `Contact`: Established relationships (People).
  - `Lead`: Potential clients, tracked by status (e.g., NEW, CONTACTED). Linked to a Contact.
  - `Deal`: Transactions tracked through a pipeline (e.g., PROSPECTING, UNDER_CONTRACT, CLOSED). Linked to a Contact.
  - `Task`: Action items assigned to Users (`@relation("TaskAssignee")`), linked to Workspaces. Status tracked via `TODO`, `IN_PROGRESS`, `DONE`.
  - `Activity`: Timeline events (e.g., `NOTE`, `CALL`) linked poly-morphically to Leads, Deals, Contacts, and Users.
  - `WorkflowSession`: Persists JSON state payloads for complex multi-step forms (e.g., `OFFER_DRAFT`, `LISTING_ENTRY`), enabling users to save, resume, and eventually submit drafted documents.

## Recent Architectural Decisions & Workarounds
- **Workflow Engine Implementation:** Migrated upstream static workflow shells away from Local Storage. They are now deeply wired to the SQLite backend via the `WorkflowSession` model. Server actions parse `?sessionId` parameters from the URL to rehydrate drafts dynamically.
- **Deal-Workflow Integration:** The `deals/[id]` detail view was expanded to query and list active `WorkflowSessions` associated with the deal. Users can launch new drafts (passing `?dealId=...` in the URL) directly from the Deal screen, successfully bridging the CRM core with the Workflow engine.
- **Client Portal Scaffolding:** Scaffolded the `(portal)` route group as a distinct environment separated from the main agent dashboard. This lays the groundwork for client-facing document review and e-signatures.
- **Schema Disambiguation:** Managed and resolved complex poly-morphic ambiguity warnings in Prisma when mapping overlapping user-to-entity relations (e.g., `assignedToId`).

## Roadmap & Future Directions
- **Portal Authentication (Phase 2):** The `/portal` route currently displays static UI. It needs an authentication layer (e.g., Magic Links via NextAuth, or a dedicated `role="CLIENT"` session check) to load real Deals and Workflow Sessions tied to the client's email.
- **Task Schema Re-attempt:** The `Task.assignedToId` mapping requires a clean database migration pass to successfully implement due-date tracking without colliding with the `Contact` model.
- **AI Integrations (Phase 3):** Introduce conversational interfaces and AI lead qualification, requiring integration with LLM providers (OpenAI/Anthropic) and potentially Vector DBs for RAG over CRM notes and activities.
