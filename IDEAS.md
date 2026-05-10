# IDEAS.md

This document contains ideas for improvements, refactoring, new features, and pivots derived from deep analysis of the project's state.

## 1. Architectural & Engineering Enhancements

- **Zod for Schema Validation:** Currently, Server Actions lack robust validation. Introduce Zod to validate all form data (Leads, Deals, Contacts, Tasks) before saving to Prisma. Share these schemas with the client for client-side validation using `react-hook-form` + `@hookform/resolvers/zod`.
- **Dynamic Dashboard Metrics:** The dashboard currently displays mocked stats. Wire up Prisma aggregations (`prisma.lead.count()`, `prisma.deal.aggregate()`) to make the dashboard 100% dynamic based on the user's workspace.
- **Drizzle ORM Evaluation:** Since the project uses SQLite and might move to Edge computing (Cloudflare/Vercel Edge), consider evaluating Drizzle ORM over Prisma for smaller bundle sizes and better Edge compatibility, especially if moving to Turso (libSQL).
- **tRPC / Server-Side API Layer:** For more complex client portal data fetching and sharing, consider introducing tRPC to maintain end-to-end type safety instead of solely relying on Server Actions.
- **WebSocket / WebRTC:** The vision mentions "Private and group chat" and "Conversational Workflows" (voice). Introduce a Socket.io or LiveKit/Daily.co integration for real-time WebRTC voice and text communication.

## 2. Feature Refinements (CRM Core)

- **Advanced Filtering & Sorting:** Add dynamic filtering (by status, priority, owner, date) and pagination to Leads, Contacts, and Deals using URL query parameters (Next.js `useSearchParams`).
- **Global Search:** Implement a command palette (`cmdk`) that allows users to instantly search across Leads, Deals, Contacts, and Tasks.
- **Activity Timeline:** Every entity (Lead, Deal, Contact) should have an activity timeline. Create an `Activity` model in Prisma to log when a lead was created, stage changed, or notes added.
- **Task Assignments & Due Dates:** Currently tasks are simple. Add `assignedToId` (User) and `dueDate` (DateTime) to the Task model. Implement a calendar view for tasks.
- **Deal Pipelines / Kanban State:** Implement drag-and-drop for the Deals Kanban board (using `@hello-pangea/dnd` or `@dnd-kit/core`) to visually update deal stages.

## 3. Product Pivots & Expansions

- **Workflow Engine (Phase 2):** Build a visual node-based workflow builder (using `reactflow`) for lead routing and automated email/SMS drips.
- **Client Portal (Phase 2):** Create a separate route group (e.g., `(portal)`) where clients can log in via magic link to view the status of their transaction, upload documents, and see assigned tasks.
- **AI Integration (Phase 3):** Integrate OpenAI API or Anthropic Claude API to generate "Deal Summaries" or "Lead Follow-up Drafts" based on the activity timeline.

## 4. Documentation & DevOps

- **Swagger / OpenAPI Specs:** If exposing an API for partner integrations, generate OpenAPI specs.
- **CI/CD Actions:** Add GitHub Actions for automated Playwright end-to-end testing, linting, and type checking on every PR.
