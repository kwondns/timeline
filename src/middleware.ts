import { NextRequest, NextResponse } from 'next/server';
import { refreshSessionInMiddleware, tryRefreshInMiddleware, verifySessionInMiddleware } from '@/lib/dal/middleware';
const PROTECTED_ROUTES = [
  '/past',
  '/calendar',
  '/present',
  '/future',
  '/time',
  '/past/:path*',
  '/present/:path*',
  '/future/:path*',
  '/time/:path*',
] as const;

const AUTH_ROUTES = ['/sign/in', '/sign/up'] as const;

const isProtectedRoute = (pathname: string): boolean => {
  return PROTECTED_ROUTES.some((route) => {
    if (route.endsWith('/:path*')) {
      const base = route.replace('/:path*', '');
      return pathname.startsWith(`${base}/`);
    }
    return pathname === route;
  });
};
const handleAuthPages = async (request: NextRequest, pathname: string) => {
  let session = await verifySessionInMiddleware(request);

  if (!session) {
    const authResponse = await tryRefreshInMiddleware(request);
    if (authResponse) {
      const res = NextResponse.redirect(new URL('/present', request.url));
      await refreshSessionInMiddleware(res, authResponse);
      return res;
    }
  }

  if (session?.isAuth && session.userId) {
    return NextResponse.redirect(new URL('/present', request.url));
  }

  return NextResponse.next();
};

const handleProtectedPages = async (request: NextRequest) => {
  let session = await verifySessionInMiddleware(request);

  if (!session) {
    const authResponse = await tryRefreshInMiddleware(request);
    if (!authResponse) {
      return NextResponse.redirect(new URL('/sign/in', request.url));
    }
    const res = NextResponse.next();
    session = await refreshSessionInMiddleware(res, authResponse);
  }

  if (session?.isAuth && session.userId) {
    const res = NextResponse.next();
    res.headers.set('x-user-id', session.userId);
    return res;
  }

  return NextResponse.redirect(new URL('/sign/in', request.url));
};

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (AUTH_ROUTES.includes(pathname as any)) {
    return handleAuthPages(request, pathname);
  }

  if (isProtectedRoute(pathname)) {
    return handleProtectedPages(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/past',
    '/calendar',
    '/present',
    '/future',
    '/time',
    '/past/:path*',
    '/present/:path*',
    '/future/:path*',
    '/time/:path*',
    '/sign/in',
    '/sign/up',
  ],
};
