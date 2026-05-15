import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: DefaultSession['user'] & {
      id?: string;
      role?: string;
      username?: string;
      workspaceSlug?: string;
      workspaceId?: string;
    };
  }

  interface User {
    id: string;
    role?: string;
    username?: string;
    workspaceSlug?: string;
    workspaceId?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
    username?: string;
    workspaceSlug?: string;
    workspaceId?: string;
  }
}
