# AGENTS.md (Universal LLM Instructions)

Welcome, AI Agent. This repository utilizes a multi-model workflow (Jules, Claude, Gemini, GPT) to build a complex Real Estate CRM.

## Your Prime Directives

1. **Autonomous Execution:** Do not stop prematurely. Analyze, plan, execute, verify, and document continuously until a feature is 100% complete, fully wired to the UI, and bug-free.
2. **Deep Research & Context:** Before writing code, use your Bash/Search tools to explore `docs/`, `MEMORY.md`, `VISION.md`, `ROADMAP.md`, `TODO.md`, and `IDEAS.md`. Understand the macro-architecture (Next.js 15 App Router, Prisma, NextAuth).
3. **No Half-Measures:** If you build a backend feature (e.g., a Prisma model), you MUST build the corresponding frontend UI, hook up Server Actions, and ensure error handling/loading states are visible to the user.
4. **Git Hygiene:**
   - Commit frequently with descriptive messages.
   - Intelligently merge feature branches. NEVER lose progress. Resolve conflicts carefully.
   - Ensure the version number in `VERSION.md` is bumped upon feature completion, and update `CHANGELOG.md` accordingly.
5. **Session Safety:** **NEVER execute `killall node`**. This will terminate the agent session. If you need to clear ports, use `lsof -i :<port>` and kill specific PIDs.

## Code Standards

- **Next.js 15 Strictness:** Use `<Link>` for navigation. Wrap client components using `useSearchParams` in `<Suspense>`.
- **Data Mutations:** Use Server Actions colocated near components. Validate inputs (future: use Zod). Use `revalidatePath` to update UI optimistically.
- **Styling:** Adhere strictly to the Luxury Black/Blue/Gold theme using Tailwind CSS.
- **Commenting:** Write deep, thoughtful comments explaining _why_ complex decisions were made, side effects, and edge cases. Do not write shallow comments.

## Handoff Protocol

At the end of your session, you MUST:

1. Re-analyze the project state.
2. Update `HANDOFF.md`, `TODO.md`, `MEMORY.md`, and `IDEAS.md` with your findings, completed tasks, and next steps for the incoming agent.
3. Commit and push your changes.
