import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: DefaultSession['user'] & {
      id?: string;
      role?: string;
      username?: string;
      workspaceSlug?: string;
    };
  }

  interface User {
    id: string;
    role?: string;
    username?: string;
    workspaceSlug?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
    username?: string;
    workspaceSlug?: string;
  }
}
