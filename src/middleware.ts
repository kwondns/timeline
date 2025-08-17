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
const THROTTLE_MS = 60_000;
async function canRefresh(request: NextRequest): Promise<boolean> {
  const last = request.cookies.get('last-refreshed')?.value;
  if (!last) return true;
  return Date.now() - parseInt(last, 10) >= THROTTLE_MS;
}
async function markRefresh(response: NextResponse) {
  response.cookies.set('last-refreshed', String(Date.now()), {
    httpOnly: true,
    path: '/',
    maxAge: 24 * 60 * 60,
  });
}
const isProtectedRoute = (pathname: string): boolean => {
  return PROTECTED_ROUTES.some((route) => {
    if (route.endsWith('/:path*')) {
      const base = route.replace('/:path*', '');
      return pathname.startsWith(`${base}/`);
    }
    return pathname === route;
  });
};
const REFRESH_THRESHOLD = 47 * 60 * 1000;

const handleAuthPages = async (request: NextRequest) => {
  let session = await verifySessionInMiddleware(request);
  const access = request.cookies.get('auth-token')?.value;
  const refreshRequire = session && session.expiresAt - Date.now() < REFRESH_THRESHOLD;
  if (!refreshRequire && session?.isAuth && session.userId && access) {
    return NextResponse.redirect(new URL('/present', request.url));
  }

  const canTryRefresh = await canRefresh(request);
  if ((refreshRequire || !session) && canTryRefresh) {
    const authResponse = await tryRefreshInMiddleware(request);
    if (authResponse) {
      const res = NextResponse.redirect(new URL('/present', request.url));
      await refreshSessionInMiddleware(res, authResponse);
      await markRefresh(res);
      return res;
    }
  }
  session = await verifySessionInMiddleware(request);
  const newRefreshRequire = session && session.expiresAt - Date.now() < REFRESH_THRESHOLD;

  if (!newRefreshRequire && session?.isAuth && session.userId) {
    return NextResponse.redirect(new URL('/present', request.url));
  }

  return NextResponse.next();
};

const handleProtectedPages = async (request: NextRequest) => {
  let session = await verifySessionInMiddleware(request);

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
    return handleAuthPages(request);
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
