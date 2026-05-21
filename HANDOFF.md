# Handoff

## Audited
- Inspected the repository and found core features implemented (CRM Core, Workflows, Portal).
- Identified Next.js dev server stability issues (ports locking up).
- Reviewed documentation files and identified missing ones.

## Changed
- Refactored `src/app/auth/signin/page.tsx` to handle `searchParams` as a Promise.
- Updated `src/components/AddActivityForm.tsx` to include an Activity Type selector.
- Cleaned up leftover workspace files.
- Added missing project documentation files.

- Audited documentation and consolidated model-specific and universal agent instructions (`AGENTS.md`, `CLAUDE.md`, etc.) to the repository root.
- Consolidated RAG vector sync and query logic by merging `src/lib/rag-sync.ts` into `src/lib/rag.ts` and updating all references across the app.
- Fixed unrelated TypeScript errors in `src/lib/actions/activity.ts` and workflow routes.
- Bumped version to `0.39.0`.

## Next Steps
- Implement better CI/CD pipeline.
- Fix Playwright tests to work consistently with the production build.


## 0.39.0 Handoff
- **Audited**: Checked core CRM functionalities, documentation gaps, and dev server stability (Next.js Turbopack port locking).
- **Implemented**: Added Activity Type selection (`NOTE`, `CALL`, `EMAIL`, `SMS`, `MEETING`) in `AddActivityForm`.
- **Fixed**: Resolved `searchParams` Promise unwrap error in Next.js 15 on the sign-in page.
- **Library Inventory**: Added `docs/LIBRARIES.md`.
- **Tested**: Verified build (`npm run build`), linting (`npm run lint`), and manual UI testing via Playwright screenshot.
- **Next Steps**: Focus on stabilizing Playwright testing environments and refactoring RAG to be modular.
