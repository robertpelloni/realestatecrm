# Workflow Implementation Analysis (Phase 2 to 3)

The upstream merge introduced two key routes: `/workflows/offer-draft` and `/workflows/listing-entry`, alongside a robust `WorkflowStudio` component and some foundational state utilities (`src/lib/workflow-store.ts`).

## Current State

- `WorkflowStudio` is a complex, front-end visual client component designed to orchestrate interactive multi-step data entry forms.
- It receives an initial `WorkflowSnapshot` (which is stored in Local Storage) and fires Server Actions (`onSave`, `onSubmit`).
- The `src/app/api/workflows/[workflowId]/route.ts` API route exists as a mock endpoint, but it does NOT actually save to the database.

## Required Database Schema Changes

To properly wire these up to the backend, we must track the state of a workflow (Draft vs Submitted) and associate it securely with a User, Workspace, and optionally a Lead/Deal.

We will need a new Prisma model:

```prisma
model WorkflowSession {
  id          String   @id @default(cuid())
  type        String   // e.g., 'OFFER_DRAFT', 'LISTING_ENTRY'
  status      String   @default("DRAFT") // DRAFT, SUBMITTED, APPROVED
  data        String   // JSON payload of the workflow state

  workspaceId String
  userId      String?
  leadId      String?
  dealId      String?

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations...
}
```

## Implementation Steps (Next Cycle)

1. Inject the `WorkflowSession` model into `prisma.schema`.
2. Rewrite `src/app/api/workflows/[workflowId]/route.ts` (or convert it into a pure Server Action passed down from the page) to mutate the `WorkflowSession` table.
3. Update `WorkflowStudio` to receive an initial loaded state from the database instead of assuming LocalStorage on mount.
4. Establish security gates: verify the `workspaceId` of the submitting user matches the `workspaceId` of the target `Deal` or `Lead`.
