# Deployment

## Setup Instructions

1. Install dependencies:
   `npm install`

2. Generate Prisma client:
   `npx prisma generate`

3. Setup environment variables (copy `.env.example` to `.env`).

4. Build the project:
   `npm run build`

5. Start the production server:
   `npx next start`

## Environment Variables
- `DATABASE_URL`: Connection string for the database.
- `NEXTAUTH_SECRET`: Secret used to encrypt session data.
- `NEXTAUTH_URL`: Canonical URL of the application.


## 0.39.0 Notes
- Next.js dev server may lock ports. Use `kill -9 $(lsof -t -i :3000)` before restarting.
