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
