[PROJECT_MEMORY]

## Architecture & Technology Stack

- **Framework:** Next.js 15+ (App Router, Turbopack enabled)
- **Language:** TypeScript across frontend and backend.
- **ORM & Database:** Prisma ORM. Currently configured to use local SQLite (`dev.db`), with plans to migrate to a scalable edge-friendly provider (like Turso/libSQL or a hosted Postgres) before production. Prisma is pinned to `^5.14.0` (currently resolving to `v5.22.0`) to avoid SQLite lock contention issues in newer versions during concurrent development and testing.
- **Authentication:** NextAuth.js configured with a custom Credentials provider. It uses a Next.js Middleware/Proxy pattern (`src/proxy.ts` required due to Turbopack edge constraints) to secure `(dashboard)` routes and redirect unauthenticated users to `/auth/signin`.
- **Styling & UI:** Tailwind CSS v4, adhering to a strict luxury theme palette (Black/Blue/Gold).

## Core Patterns & Conventions

- **Server Actions over API Routes:** For data mutations (e.g., adding a lead, creating a deal, logging an activity), the project uses Next.js Server Actions placed in the same component file or near the views rather than traditional REST API `/api/...` routes. This streamlines data flow and leverages `revalidatePath` for optimistic UI updates.
- **Input Validation (Zod):** Zod schemas are defined in `src/lib/validations/` (e.g., `lead.ts`, `deal.ts`, `contact.ts`, `task.ts`, `activity.ts`) and actively utilized within Server Actions to rigorously parse and validate incoming `FormData` before hitting Prisma. Error strings are passed back to client components for display.
- **Suspense Boundaries & Query Params:** Extensive use of `React.Suspense` is required around components that consume `useSearchParams` or deal with client-side URL parameters, as enforced by Next.js 15 strict mode. List pages (Leads, Contacts, Tasks) now use URL parameters (`?q=` and `?status=`) for advanced search and filtering.
- **Component Colocation & Error Handling:** Modals and specific UI components (like `AddLeadModal.tsx` and `AddActivityForm.tsx`) are colocated near the views that use them. Modals handle error state rendering derived from their paired Server Action, and use `react-hot-toast` to provide non-blocking success/error feedback.
- **Navigation:** Strict usage of Next.js `<Link>` components over raw HTML `<a>` tags to enable prefetching and smooth SPA-like transitions within the App Router.

## Data Models (Prisma Schema)

- **User & Workspace:** Foundational multi-tenant structure. Users belong to a Workspace.
- **CRM Entities:**
  - `Contact`: Established relationships (People).
  - `Lead`: Potential clients, tracked by status (e.g., NEW, CONTACTED). Linked to a Contact.
  - `Deal`: Transactions tracked through a pipeline (e.g., PROSPECTING, UNDER_CONTRACT, CLOSED). Linked to a Contact.
  - `Task`: Action items assigned to Users, linked to Workspaces. Status tracked via `TODO`, `IN_PROGRESS`, `DONE`.
  - `Activity`: Timeline events (e.g., `NOTE`, `CALL`, `EMAIL`, `STATUS_CHANGE`) linked poly-morphically to Leads, Deals, Contacts, and Users.

## Recent Architectural Decisions & Workarounds

- **Activity Timeline Implementation:** Added the `Activity` model to track CRM notes and events. Integrated this seamlessly into the Lead Detail view with an interactive `AddActivityForm` using Server Actions and Zod validation.
- **Dynamic Data Slicing:** Transitioned away from static lists. Data tables now dynamically filter based on URL Search Parameters, pulling directly through targeted Prisma queries (`where: { OR: [...] }`).
- **Zod & Toast Integration:** Hardened Server Actions with Zod. Client modals were updated to display validation errors gracefully and emit success Toasts via `react-hot-toast` instead of failing silently or blindly redirecting.
- **Dynamic Dashboard Metrics:** The dashboard (`src/app/(dashboard)/page.tsx`) dynamically pulls actual aggregate counts (`prisma.lead.count()`, `prisma.deal.findMany()` summing values) instead of rendering static mock data.
- **Upstream Workflow Shells:** Safely merged upstream scaffolding for Workflow shells (`/workflows/offer-draft` and `/workflows/listing-entry`) to begin bridging the gap between pure CRM entities and real-estate specific document workflows.

## Roadmap & Future Directions

- **Feature Expansion (Phase 2):** Extend Activity timelines to Contacts and Deals views. Implement pagination (`take`/`skip`) on the data tables as data volume grows. Add Due Dates and assignments to Tasks.
- **Workflow Engine & Client Portal:** Focus on automation (routing) and client-facing interfaces (e.g., a magic-link driven portal for buyers/sellers to track deal progress and complete workflows like offer-drafting).
- **AI Integrations (Phase 3):** Introduce conversational interfaces and AI lead qualification, requiring integration with LLM providers (OpenAI/Anthropic) and potentially Vector DBs for RAG over CRM notes and activities.
