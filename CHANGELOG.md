# CHANGELOG.md

## [0.1.0] - Initial Planning & Documentation

- Created foundational documentation (VISION, MEMORY, DEPLOY, AGENTS, etc.).
- Defined architecture and phase 1 roadmap.
- Initialized version tracking.

## [0.2.0] - Next.js Scaffold

- Initialized Next.js project with TypeScript, Tailwind CSS, and App Router.

## [0.3.0] - CI/CD & Formatting

- Set up Prettier for code formatting.
- Renamed project in package.json to real-estate-crm.

## [0.4.0] - Theme & Landing Page

- Implemented Black/Blue/Gold luxury theme in globals.css.
- Added landing page stub matching the design identity.

## [0.5.0] - Authentication & CI/CD Scaffold

- Created GitHub Actions CI workflow for lint and build.
- Installed NextAuth and created the NextAuth configuration, route handler, and sign-in page.

## [0.6.0] - Database & Dashboard Scaffold

- Initialized Prisma and defined core schema (User, Workspace, Contact, Lead, Deal).
- Scaffolded the base dashboard shell layout and home page.

## [0.7.0] - Leads & Deals UI Scaffold

- Created Leads list view (`leads/page.tsx`).
- Created Deals kanban pipeline view (`deals/page.tsx`).

## [0.8.0] - Prisma SQLite Setup

- Switched Prisma to use local SQLite for development.
- Generated Prisma Client and exported a singleton in `src/lib/prisma.ts`.

## [0.9.0] - Database Seeding & UI Data Wiring

- Created a mock seed script (`prisma/seed.ts`) to populate the development database.
- Updated Dashboard, Leads, and Deals UI to fetch and render actual data from the database using Prisma.

## [0.10.0] - UI Modals & Actions

- Created `AddLeadModal` and Server Action for creating Leads.
- Created `AddDealModal` and Server Action for creating Deals.

## [0.11.0] - Contacts UI & Data Wiring

- Scaffolded the Contacts view (`contacts/page.tsx`) connecting to Prisma.
- Implemented `AddContactModal` and server action for creating new contacts.

## [0.12.0] - Session Management & Protected Routes

- Added `SessionProvider` wrapper to `layout.tsx`.
- Implemented `middleware.ts` to protect dashboard routes with NextAuth.
- Updated `(dashboard)/layout.tsx` to display logged-in user data from NextAuth session.

## [0.13.0] - Database Authentication Flow

- Wired NextAuth credentials provider to validate against the Prisma database.
- Updated the sign-in page to execute NextAuth client-side sign-in.
- Added a dynamic Sign Out button to the dashboard sidebar.

## [0.17.0] - Zod Validation & Dynamic Dashboard Data

- Implemented robust Zod schema validation across all core data models (`Lead`, `Deal`, `Contact`, `Task`).
- Updated all Server Actions to parse and return validation errors gracefully.
- Refactored `AddLeadModal`, `AddDealModal`, `AddContactModal`, and `AddTaskModal` to capture and display these validation errors without crashing the UI.
- Wired up the main `Dashboard` view to query Prisma dynamically, calculating active leads, pipeline values, and pending tasks based on actual data rather than mocks.

## [0.18.0] - UI Polish & Toast Notifications

- Added `react-hot-toast` to provide user feedback upon form submissions.
- Wrapped `Providers` with the `<Toaster />` context styled for the luxury theme.
- Configured all Modals (`AddLeadModal`, `AddDealModal`, `AddContactModal`, `AddTaskModal`) to fire a `toast.success` upon successful server action completion.

## [0.19.0] - Activity Scaffolding & Dynamic List Filtering

- Added URL-based search (`q`) and `status` filtering to the Leads, Contacts, and Tasks list pages, fully satisfying strict Next.js 15 `useSearchParams` patterns.
- Scaffolded the `Activity` data model in Prisma. This lays the groundwork for the core CRM activity timeline (logging when lead states change, notes, emails, calls).

## [0.20.0] - Activity Timeline & Notes

- Built the `AddActivityForm` component, allowing users to log notes on a Lead record.
- Added `activitySchema` in Zod to validate activity additions.
- Wired the `/leads/[id]` detail view to render the timeline dynamically using the newly scaffolded `Activity` model in Prisma.

## [0.21.0] - Upstream Workflow Synchronization

- Executed strict recursive merge of `origin/main` upstream features (Offer Draft and Listing Entry workflows) with local `main` branch.
- Successfully resolved all TypeScript collisions resulting from workflow scaffolding overlapping with core CRM `useSearchParams` filtering.
- Prevented schema divergence related to `Task` due dates to guarantee build stability alongside upstream UI additions.
- Verified stable production compile.

## [0.22.0] - Task Assignments, Due Dates, and Lead Pagination

- Safely solved ambiguous relation schema collisions by using named relations (`@relation("TaskAssignee")`) for `Task.assignedTo`.
- Updated `Task` Prisma model and Zod schemas to support `dueDate` and `assignedToId`.
- Updated `AddTaskModal` UI and the backend Server Action to capture, validate, and store Task deadlines and assignments.
- Implemented `take`/`skip` server-side pagination on the Leads list view using Next.js `searchParams`.

## [0.23.0] - Universal Pagination & Activity Propagation

- Extended the `take`/`skip` server-side pagination model uniformly across the `Contacts` and `Tasks` list pages to match `Leads`.
- Expanded the polymorphic `AddActivityForm` to `Deals` and `Contacts` detail views, ensuring unified timeline tracking across the entire CRM stack.
- Completed architectural analysis of the upstream `WorkflowStudio` components, generating `WORKFLOW_ANALYSIS.md` to map out upcoming DB integration phases.

## [0.24.0] - Workflow Schema Wiring & Dashboard Deep Linking

- Scaffolded `WorkflowSession` model in Prisma to track user workflow drafts (e.g. `OFFER_DRAFT`, `LISTING_ENTRY`).
- Removed local-storage mock handlers in upstream `WorkflowStudio` components.
- Introduced `src/lib/actions/workflow.ts` (Next.js Server Actions) to save and submit JSON workflow payloads directly to the SQLite backend.
- Converted aggregate dashboard metrics into deep-links (e.g., clicking "Tasks Due" pushes the user to `/tasks?status=TODO`).

## [0.25.0] - Phase 2 Workflow DB Hookups

- Built `src/lib/validations/workflow.ts` schema to enforce strict checking of workflow JSON payloads.
- Converted `/workflows/offer-draft` and `/workflows/listing-entry` to dynamic Server Components that parse `?sessionId` from the URL.
- These workflow pages now fetch existing `WorkflowSession` records from Prisma and inject their parsed JSON histories into `WorkflowStudio` components.
- The `WorkflowStudio` interactive shell is now a true persistent interface connected to the SQLite backend.

## [0.26.0] - Phase 2 Portal Scaffolding & Deal Workflows

- Integrated `WorkflowSession` routing deeply into the Deal Details view. Users can now spin up active Offer Drafts and Listing Entries directly associated to a specific CRM `Deal`.
- Created the foundational `(portal)` route group, establishing the client-facing UI shell (separate from the agent dashboard) where clients will eventually sign and review synced workflows.

## [0.27.0] - Portal Auth Routing & Handoff Preparation

- Reconfigured `next-auth` JWT callbacks (`src/lib/auth.ts`) to inject Prisma user roles and IDs directly into the session token.
- Applied `src/proxy.ts` middleware matcher to automatically protect the new `/(portal)` route group.
- Implemented data-driven views on `/portal` mapping the logged-in user's email directly to a `Contact` record, fetching their specific active `Deals` and pending `WorkflowSessions`.
- Reconciled tracking documentation for handoff to Phase 3 agents.
