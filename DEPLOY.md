# DEPLOY.md

## Local Development

To run the project locally:

1. Clone the repository.
2. Install dependencies:
   `npm install`
3. Set up the environment variables:
   Copy `.env.example` to `.env` and configure `NEXTAUTH_SECRET` and `DATABASE_URL`.
   `cp .env.example .env`
4. Push the Prisma schema to the local SQLite database and seed it:
   `npx prisma db push`
   `npx prisma db seed`
5. Start the development server (uses Turbopack):
   `npm run dev`

## Production Deployment (Vercel)

The project is designed to be deployed on Vercel.

1. Connect the repository to Vercel.
2. Ensure the framework preset is set to **Next.js**.
3. **Important:** Because the project currently uses a local SQLite database (`dev.db`), it is **not suitable for a stateless production environment** like Vercel out-of-the-box.
   - **Pre-requisite for Production:** Migrate the Prisma configuration to use a hosted database provider (e.g., Turso/libSQL, Supabase, Neon, or PlanetScale). Update the `DATABASE_URL` in Vercel environment variables accordingly.
4. Set the `NEXTAUTH_SECRET` and `NEXTAUTH_URL` environment variables in the Vercel dashboard.
5. Deploy.

## Known Deployment Gotchas

- **Middleware / Edge Runtime:** The project uses `src/proxy.ts` instead of `middleware.ts` to handle NextAuth protection. This is a workaround for Next.js 15 Turbopack compilation issues with Node.js core modules in the Edge runtime. Ensure Vercel deployment logs don't throw Edge-compatibility errors during build.
- **Prisma Version:** Pinned to `^5.14.0`. Be cautious when upgrading, as newer versions have exhibited lock-contention issues with local SQLite during concurrent testing/builds.
