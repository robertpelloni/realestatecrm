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
