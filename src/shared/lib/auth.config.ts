import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import type { NextAuthConfig } from 'next-auth';

/**
 * Edge-compatible auth config (no Prisma / Node.js modules).
 * Used by middleware and as the base for the full auth config.
 */
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
} satisfies NextAuthConfig;
