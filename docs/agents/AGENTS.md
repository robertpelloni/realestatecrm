# AGENTS.md

## Universal LLM Instructions

This file contains the global instructions for all AI agents (Claude, Gemini, GPT, Copilot) working on this project.

### Protocol for Every Session

1. **Memory & Context:** Read all documentation (`README.md`, `VISION.md`, `ROADMAP.md`, `AGENTS.md`) before starting.
2. **Analysis:** Analyze the project in extreme depth to determine missing features, incomplete code, or refactoring opportunities.
3. **Documentation:** Update `TODO.md`, `ROADMAP.md`, `CHANGELOG.md`, and `VERSION.md` (incrementing build/version). Always document your findings and session history in `HANDOFF.md`.
4. **Implementation:** Proceed autonomously to implement features based on the roadmap. Ensure wide breadth of options, zero bugs, and full UI representation.
5. **Coding Standards:**
   - Use TypeScript.
   - Comment code in depth (explain the why, side effects, optimizations, non-working methods). Do not comment self-explanatory code.
   - Ensure all version references point to `VERSION.md` dynamically where possible.
6. **Git Protocol:** Intelligently merge feature branches, pull upstream changes, commit, and push frequently. Use descriptive commit messages including the version bump.
