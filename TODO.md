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
- [ ] **Feature Expansion:** Task deadlines and assignment (`dueDate`, `assignedToId`).

## Known Bugs / Tech Debt

- Port conflict handling for tests needs a robust setup (`playwright` config).
- Prisma SQLite dev.db causes occasional locking if dev server and tests hit it concurrently.
