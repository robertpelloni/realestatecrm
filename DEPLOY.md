# DEPLOY.md

## Deployment Strategy

The application is planned to be a TypeScript-based web platform (likely Next.js or similar) with a mobile counterpart (React Native/Expo).

### Backend & Frontend (Web)

- **Hosting:** To be determined (Vercel/AWS/Render recommended for Next.js).
- **CI/CD:** GitHub Actions will be configured to automatically run tests, linting, and build steps.
- **Build Command:** `npm run build`
- **Start Command:** `npm start`

### Environment Setup
If you are planning to deploy with Pinecone as your hosted vector provider, be sure to set the following in your deployment environment variables:
- `PINECONE_API_KEY`
- `PINECONE_NAMESPACE` (optional)

_Note: Detailed deployment steps will be fleshed out once the TypeScript scaffold is fully implemented._
