import { NextRequest, NextResponse } from 'next/server';
import { verifySessionInMiddleware, refreshTokenInMiddleware } from '@/lib/middleware';

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

const handleAuthPages = async (request: NextRequest) => {
  // 토큰 갱신 시도 후 다시 검증
  const refreshResult = await refreshTokenInMiddleware(request);

  // 갱신 성공 시 즉시 present로 이동
  if (refreshResult.success && refreshResult.session?.userId) {
    const response = NextResponse.redirect(new URL('/present', request.url));
    // 갱신된 쿠키를 응답에 복사
    if (refreshResult.response) {
      refreshResult.response.cookies.getAll().forEach((cookie) => {
        response.cookies.set(cookie.name, cookie.value, {
          httpOnly: cookie.httpOnly,
          secure: cookie.secure,
          expires: cookie.expires,
          sameSite: cookie.sameSite as any,
          path: cookie.path,
        });
      });
    }
    return response;
  }

  // 기존 토큰으로 체크
  const session = await verifySessionInMiddleware(request);
  const access = request.cookies.get('auth-token')?.value;

  if (session?.isAuth && session.userId && access) {
    return NextResponse.redirect(new URL('/present', request.url));
  }

  return NextResponse.next();
};

const handleProtectedPages = async (request: NextRequest) => {
  // 토큰 갱신 시도
  const result = await refreshTokenInMiddleware(request);

  // 갱신 성공이거나 기존 세션이 유효한 경우
  if (result.success || result.session?.isAuth) {
    const session = result.session;
    if (session?.userId) {
      const res = result.response || NextResponse.next();
      res.headers.set('x-user-id', session.userId);
      return res;
    }
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
