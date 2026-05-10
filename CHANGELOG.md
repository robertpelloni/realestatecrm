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

## [0.6.0] - Workflow Shells

- Added exact UI screen flows for offer and listing entry.
- Built reusable workflow screen components.
- Added Next.js workflow shell pages for offer drafting and listing entry.
- Updated the landing page to link into the workflow shells.

## [0.7.0] - Interactive Workflow Shells

- Added editable form state and mock CRM data to the offer and listing screens.
- Implemented local draft persistence, validation gating, and activity feeds.
- Added mobile-safe sticky action bars and offline-friendly recovery behavior.

## [0.8.0] - Backend Workflow Store

- Added a file-backed backend workflow snapshot store.
- Hydrated offer and listing workflows from `/api/workflows/[workflowId]`.
- Synced workflow saves between client, backend, and local fallback storage.
