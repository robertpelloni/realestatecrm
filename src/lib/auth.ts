import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { DefaultSession, NextAuthOptions, User as NextAuthUser } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';
import prisma from './prisma';

type AuthUser = NextAuthUser & {
  role?: string | null;
};

type AuthToken = JWT & {
  id?: string;
  role?: string | null;
};

type SessionUser = DefaultSession['user'] & {
  id?: string;
  role?: string | null;
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'lum@excellegacy.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim() ?? '';
        const password = credentials?.password ?? '';

        const demoEmail = process.env.AUTH_DEMO_EMAIL?.trim();
        const demoPassword = process.env.AUTH_DEMO_PASSWORD?.trim();

        if (demoEmail && demoPassword && email === demoEmail && password === demoPassword) {
          return {
            id: 'demo-user',
            name: process.env.AUTH_DEMO_NAME ?? 'Excel Legacy Admin',
            email: demoEmail,
          } satisfies AuthUser;
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          } satisfies AuthUser;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      const typedToken = token as AuthToken;

      if (user) {
        const typedUser = user as AuthUser;
        typedToken.id = typedUser.id;
        typedToken.role = typedUser.role ?? undefined;
      }

      return typedToken;
    },
    session({ session, token }) {
      const typedSession = session as DefaultSession & { user?: SessionUser };
      const typedToken = token as AuthToken;

      if (typedSession.user) {
        typedSession.user.id = typedToken.id;
        typedSession.user.role = typedToken.role ?? null;
      }

      return typedSession;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
  debug: process.env.NODE_ENV === 'development',
};