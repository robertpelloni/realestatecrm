import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/auth/signin',
  },
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth/signin (sign in page)
     * - root (/) (landing page)
     *
     * Note: /portal is implicitly protected by this matcher.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|auth/signin|$).*)',
  ],
};
