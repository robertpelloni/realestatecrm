# AI RAG Strategy (Phase 3)

To power the conversational `AIChat` interface effectively, the AI must have instantaneous, semantic context of the User's workspace, leads, and historical activity timelines. Relying purely on keyword matching (SQL `LIKE`) will fall short of the "Intelligent CRM" mandate.

We will implement a Retrieval-Augmented Generation (RAG) pipeline to bridge the relational SQLite/Prisma backend with an LLM.

## High-Level Architecture

1. **Vector Store Selection:**
   - Since the project is currently local SQLite (`dev.db`) but intended for Vercel, we will integrate a serverless Vector Database.
   - **Recommendation:** Pinecone or Supabase pgvector. (For Vercel Edge compatibility, Pinecone's REST API or Turso's vector extensions are optimal).

2. **Embedding Generation:**
   - Use OpenAI `text-embedding-3-small` for fast, cost-effective embeddings.

3. **Data Synchronization (The "RAG Sync" Loop):**
   - RAG requires keeping the vector representations in sync with the relational database.
   - We will tap into our existing Server Actions (e.g., `src/lib/actions/workflow.ts` or `addActivity` inside `leads/[id]/page.tsx`).
   - Every time a new `Activity`, `Lead`, or `Deal` is created or updated, we will queue a background job (or use `after()` in Next.js 15) to:
     a) Construct a semantic string: _"Lead John Doe (john@example.com) is in QUALIFIED stage. Recent note: Client wants to buy in Royal Oak."_
     b) Generate the embedding.
     c) Upsert the vector to Pinecone with metadata `(workspaceId, entityType, entityId)`.

## AIChat Flow (Inbound)

When a user asks: _"Who did I talk to yesterday about Royal Oak?"_

1. **Chat API Route:** The client sends the query to a new Next.js route `POST /api/chat`.
2. **Retrieve:** The route embeds the query and searches the Vector DB, filtering strictly by the user's `workspaceId`.
3. **Augment & Generate:** The API retrieves the top 5 most relevant CRM notes/leads, injects them into the system prompt of the LLM (e.g., `gpt-4o`), and streams the response back to the floating `AIChat` component.

## Implementation Next Steps

- [ ] Add `@pinecone-database/pinecone` and `openai` (or `@ai-sdk/openai`) to `package.json`.
- [ ] Create `src/lib/rag.ts` containing `generateEmbedding()` and `upsertVector()`.
- [ ] Refactor existing `AddActivityForm` server actions to trigger vector upserts asynchronously.
- [ ] Build the `/api/chat` route to handle incoming chat messages from the `AIChat.tsx` UI.
