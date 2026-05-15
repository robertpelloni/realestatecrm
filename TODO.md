# TODO.md

## Short-Term Tasks & Backlog

- [x] Create universal and model-specific agent documentation (AGENTS.md, CLAUDE.md, etc.).
- [x] Create project tracking docs (VISION.md, MEMORY.md, DEPLOY.md, CHANGELOG.md, VERSION.md, HANDOFF.md).
- [x] Initialize TypeScript repository scaffold (Node.js / Next.js / React Native).
- [x] Set up linting, formatting, and CI/CD pipelines.
- [x] Implement foundational UI theme (black/blue/gold luxury identity).
- [x] Scaffold authentication and role-based access control (RBAC).
- [x] Scaffold dashboard and CRM core entities (Prisma).
- [x] Scaffold Leads and Deals UI.
- [x] Wire up dashboard UI with actual database data (Prisma).
- [x] Create mock seed data script (`prisma/seed.ts`).
- [x] Implement Add Lead and New Deal forms and server actions.
- [x] Integrate NextAuth session context and protect dashboard routes.
- [x] Connect NextAuth to Prisma and implement Sign In / Sign Out UI flows.
- [x] Implement Tasks view and AddTask modal.
- [x] **Document Updates:** Thoroughly audit and update all project documentation (VISION.md, DEPLOY.md, ROADMAP.md, PROJECT_STRUCTURE.md, AGENTS.md).
- [x] **Data Validation:** Implement Zod schema validation for all Server Actions (Leads, Contacts, Deals, Tasks).
- [x] **Dashboard Metrics:** Replace hardcoded/mocked statistics on the main dashboard with dynamic Prisma queries.
- [x] **UI Polish:** Add comprehensive UI loading states and Toast notifications for form submissions.
- [x] **Feature Expansion:** Add filtering, sorting, and pagination across all data tables (Leads, Contacts, Tasks) using `useSearchParams`.
- [x] **Feature Expansion:** Activity timelines for entities (record when status changes). Scaffold the `Activity` Prisma model.
- [x] **Feature Expansion:** Task deadlines and assignment (`dueDate`, `assignedToId`).

## Known Bugs / Tech Debt

- Port conflict handling for tests needs a robust setup (`playwright` config).
- Prisma SQLite dev.db causes occasional locking if dev server and tests hit it concurrently.

## Phase 2 Roadmap Items (Immediate)

- [x] **Client Portal Routing:** Create `src/app/(portal)` route group with layout. Add magic-link or dedicated Auth checks.
- [x] **Portal Home:** Display assigned Deals and Workflows for the client.
- [x] **Workflow Deal Integration:** Link workflows directly to Deal IDs in the UI so users can trigger them from `/deals/[id]`.

## Phase 3 Roadmap Items (Immediate)

- [x] **AI Assistant UI:** Build a global floating chat component (`AIChat.tsx`) that persists across navigation via Next.js layouts.
- [x] **Data RAG preparation:** Draft a technical plan for synchronizing `Activity` and `Contact` records into a vector database (e.g. Pinecone/Supabase) to support the AI assistant.

## Phase 3 Roadmap Items (Continued)

- [x] **Vector Sync Wiring:** Implement the background synchronization logic inside Prisma Server Actions to upsert `Activity`, `Contact`, `Lead`, and `Deal` records to the Vector DB.
- [x] **AI API Route:** Build the `/api/chat` route to retrieve vectors and stream responses back to `AIChat.tsx`.
- [x] **Semantic Retrieval:** Upgrade chat context from keyword summaries to embeddings-powered workspace retrieval with a local fallback index.
- [x] **Hosted Vector Provider:** Finalize Pinecone/custom remote provider support with workspace-scoped query and upsert handling.
- [x] **Auth Hardening:** Add middleware protection and server-side workspace access enforcement for authenticated CRM routes.

## Release Checkpoint

- [x] Rebase and merge the latest GitHub `main` back into the local branch.
- [x] Reapply the Prisma, dashboard, workflow, and auth updates after the merge.
- [x] Verify lint and production build.
- [x] Push the merged state back to `origin/main`.
- [x] Update release notes and versioning to reflect the new checkpoint.
