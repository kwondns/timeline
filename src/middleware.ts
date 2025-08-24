import { NextRequest, NextResponse } from 'next/server';
import { refreshTokenInMiddleware } from '@/lib/middleware';
import { routing } from '@/i18n/routing';
import createMiddleware from 'next-intl/middleware';
import { getLocale, setLocaleCookie, stripLocale } from '@/lib/middleware/i18n';
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

const handleAuthPages = async (request: NextRequest, intlResponse: NextResponse) => {
  // 토큰 갱신 시도 후 다시 검증
  const refreshResult = await refreshTokenInMiddleware(request, intlResponse);

  const locale = getLocale(request.nextUrl.pathname);

  // 갱신 성공 시 즉시 present로 이동
  if (refreshResult.success && refreshResult.session?.userId) {
    const successRedirectResponse = NextResponse.redirect(new URL(`/${locale}/present`, request.url));
    // 갱신된 쿠키를 응답에 복사
    if (refreshResult.response) {
      refreshResult.response.cookies.getAll().forEach((cookie) => {
        successRedirectResponse.cookies.set(cookie.name, cookie.value, {
          httpOnly: cookie.httpOnly,
          secure: cookie.secure,
          expires: cookie.expires,
          sameSite: cookie.sameSite as any,
          path: cookie.path,
        });
      });
    }
    return successRedirectResponse;
  }

  return intlResponse;
};

const handleProtectedPages = async (request: NextRequest, intlResponse: NextResponse) => {
  // 토큰 갱신 시도
  const result = await refreshTokenInMiddleware(request, intlResponse);
  const locale = getLocale(request.nextUrl.pathname);

  // 갱신 성공이거나 기존 세션이 유효한 경우
  if (result.success && result.response) {
    return result.response;
  }
  const redirectResponse = NextResponse.redirect(new URL(`/${locale}/sign/in`, request.url));
  clearAuthCookies(redirectResponse);
  setLocaleCookie(request, redirectResponse);

  return redirectResponse;
};

export default async function middleware(request: NextRequest) {
  const intlResponse = intlMiddleware(request) ?? NextResponse.next();

  setLocaleCookie(request, intlResponse);

  const { pathname } = request.nextUrl;

  if (AUTH_ROUTES.some((route) => stripLocale(pathname) === route)) {
    return handleAuthPages(request, intlResponse);
  }

  if (isProtectedRoute(pathname)) {
    return handleProtectedPages(request, intlResponse);
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
