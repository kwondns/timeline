import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth/session';
import { TOKEN_EXPIRY, API_TIMEOUTS } from '@/constants/TOKEN_TTL';

export async function verifySessionInMiddleware(request: NextRequest): Promise<{
  isAuth: boolean;
  userId: string;
  expiresAt?: number;
} | null> {
  try {
    const sessionCookie = request.cookies.get('session')?.value;
    if (!sessionCookie) {
      return null;
    }

    const session = await decrypt(sessionCookie);
    if (!session?.userId) {
      return null;
    }

    // JWT exp는 초 단위, expiresAt는 밀리초 단위
    const nowSec = Math.floor(Date.now() / 1000);
    if (session.exp && session.exp <= nowSec) {
      return null;
    }

    return { isAuth: true, userId: session.userId, expiresAt: session.expiresAt };
  } catch (error) {
    return null;
  }
}

async function shouldRefreshToken(request: NextRequest, session: { expiresAt?: number }): Promise<boolean> {
  // 1. auth-token이 없으면 무조건 갱신 필요
  const authToken = request.cookies.get('auth-token')?.value;
  if (!authToken) {
    return true;
  }

  // 2. 세션 시간 기반 갱신 필요성 확인
  if (!session.expiresAt) {
    return true;
  }

  const now = Date.now();
  const timeLeft = session.expiresAt - now;

  return timeLeft <= TOKEN_EXPIRY.THRESHOLD;
}

async function performTokenRefresh(request: NextRequest): Promise<{
  success: boolean;
  newTokens?: {
    accessToken: string;
    refreshToken: string;
    userId: string;
  };
}> {
  const refreshToken = request.cookies.get('refresh-token')?.value;
  if (!refreshToken) {
    return { success: false };
  }

  if (!process.env.API_SERVER_URL) {
    return { success: false };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUTS.REFRESH);

  try {
    const refreshResult = await fetch(`${process.env.API_SERVER_URL}/user/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `refresh-token=${refreshToken}`,
      },
      signal: controller.signal,
    });

    if (!refreshResult.ok) return { success: false };

    const result = await refreshResult.json();
    if (!result.accessToken || !result.refreshToken || !result.userId) {
      return {
        success: false,
      };
    }

    return { success: true, newTokens: result };
  } catch (e) {
    return { success: false };
  } finally {
    clearTimeout(timeoutId);
  }
}

function setCookieInResponse(response: NextResponse, key: string, value: string, maxAgeMs: number) {
  // expires 방식으로 쿠키 설정 (더 안정적)
  const expires = new Date(Date.now() + maxAgeMs);

  response.cookies.set(key, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
}

function clearAuthCookies(response: NextResponse) {
  ['session', 'auth-token', 'refresh-token'].forEach((cookie) => {
    response.cookies.set(cookie, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0), // 즉시 만료
      sameSite: 'lax',
      path: '/',
    });
  });
}

export async function refreshTokenInMiddleware(request: NextRequest): Promise<{
  success: boolean;
  session: { isAuth: boolean; userId: string; expiresAt?: number } | null;
  response?: NextResponse;
}> {
  try {
    const session = await verifySessionInMiddleware(request);

    if (!session) {
      return { success: false, session: null };
    }

    // auth-token 존재 여부와 세션 시간을 함께 고려하여 갱신 필요성 확인
    const needsRefresh = await shouldRefreshToken(request, session);
    if (!needsRefresh) {
      return { success: true, session };
    }

    // 토큰 갱신 수행
    const refreshResult = await performTokenRefresh(request);

    if (!refreshResult.success || !refreshResult.newTokens) {
      // 갱신 실패 시 세션 무효화
      const response = NextResponse.next();
      clearAuthCookies(response);

      return { success: false, session: null, response };
    }

    // 새로운 세션과 토큰 생성
    const { accessToken, refreshToken, userId } = refreshResult.newTokens;
    const newExpiresAt = Date.now() + TOKEN_EXPIRY.SESSION;

    // 새 세션 토큰 생성
    const { encrypt } = await import('@/lib/auth/session');
    const sessionToken = await encrypt({ userId, expiresAt: newExpiresAt });

    // 응답에 새 쿠키 설정
    const response = NextResponse.next();
    setCookieInResponse(response, 'session', sessionToken, TOKEN_EXPIRY.SESSION);
    setCookieInResponse(response, 'auth-token', accessToken, TOKEN_EXPIRY.ACCESS);
    setCookieInResponse(response, 'refresh-token', refreshToken, TOKEN_EXPIRY.REFRESH);

    // 갱신 성공 시 새로운 세션 정보 반환
    const newSession = { isAuth: true, userId, expiresAt: newExpiresAt };
    return { success: true, session: newSession, response };
  } catch (error) {
    return { success: false, session: null };
  }
}
