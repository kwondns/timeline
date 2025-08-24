import { NextRequest, NextResponse } from 'next/server';
import { verifySessionInMiddleware, refreshTokenInMiddleware } from '@/lib/middleware';
import { routing } from '@/i18n/routing';
import createMiddleware from 'next-intl/middleware';
import { getLocale, stripLocale } from '@/lib/middleware/i18n';
import { clearAuthCookies } from '@/lib/middleware/core';

const intlMiddleware = createMiddleware(routing);

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
  const path = stripLocale(pathname);
  return PROTECTED_ROUTES.some((route) =>
    route.endsWith('/:path*') ? path.startsWith(route.replace('/:path*', '') + '/') : path === route,
  );
};

const handleAuthPages = async (request: NextRequest) => {
  // 토큰 갱신 시도 후 다시 검증
  const refreshResult = await refreshTokenInMiddleware(request);

  // 갱신 성공 시 즉시 present로 이동
  if (refreshResult.success && refreshResult.session?.userId) {
    const response = NextResponse.redirect(new URL(`/${request.nextUrl.locale}/present`, request.url));
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
    return NextResponse.redirect(new URL(`/${request.nextUrl.locale}/present`, request.url));
  }

  return NextResponse.next();
};

const handleProtectedPages = async (request: NextRequest) => {
  // 토큰 갱신 시도
  const result = await refreshTokenInMiddleware(request);

  // 갱신 성공이거나 기존 세션이 유효한 경우
  if (result.success && result.response) {
    return result.response;
  }
  const redirectResponse = NextResponse.redirect(new URL(`/${request.nextUrl.locale}/sign/in`, request.url));
  clearAuthCookies(redirectResponse);

  return redirectResponse;
};

export default async function middleware(request: NextRequest) {
  const intlResponse = intlMiddleware(request) ?? NextResponse.next();

  const locale = getLocale(request.nextUrl.pathname);
  intlResponse.cookies.set('NEXT_LOCALE', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });

  const { pathname } = request.nextUrl;

  if (AUTH_ROUTES.some((route) => stripLocale(pathname) === route)) {
    return handleAuthPages(request);
  }

  if (isProtectedRoute(pathname)) {
    return handleProtectedPages(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/:locale(en|ko|es|fr|ja|zh-cn)/(sign/in|sign/up)',
    '/:locale(en|ko|es|fr|ja|zh-cn)/(past|calendar|present|future|time)(/:path*)?',
    '/:locale(en|ko|es|fr|ja|zh-cn)/:path*',
  ],
};
