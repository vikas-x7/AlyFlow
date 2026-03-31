import NextAuth from 'next-auth';
import authConfig from '@/shared/lib/auth.config';

const { auth } = NextAuth(authConfig);

const publicPaths = ['/', '/login', '/register', '/api/auth'];

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const isPublic = publicPaths.some((p) => pathname === p || pathname.startsWith(p + '/'));

  if (isPublic) return;

  if (!req.auth) {
    const loginUrl = new URL('/login', req.nextUrl.origin);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/).*)'],
};
