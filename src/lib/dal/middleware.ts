import { NextRequest, NextResponse } from 'next/server';
import { decrypt, encrypt, SessionPayload } from '@/lib/session';
import { AuthResponseType } from '@/types/auth.type';

const SESSION_TTL = 1000 * 60 * 60;
const ACCESS_TTL = 1000 * 60 * 15;
const REFRESH_TTL = 1000 * 60 * 60 * 24 * 7;

export async function verifySessionInMiddleware(request: NextRequest): Promise<SessionPayload | null> {
  const sessionCookie = request.cookies.get('session')?.value;
  if (!sessionCookie) return null;

  let session = await decrypt(sessionCookie);
  if (!session) return null;

  if (!session?.userId) return null;

  const nowSec = Math.floor(Date.now() / 1000);
  // 세션에 만료 필드가 있다면 이미 만료된 경우만 차단
  if (session.exp && session.exp <= nowSec) return null;

  return { isAuth: true, userId: session.userId, expiresAt: session.expiresAt };
}
export async function tryRefreshInMiddleware(request: NextRequest): Promise<AuthResponseType | null> {
  const cookie = request.headers.get('cookie') ?? '';
  if (!cookie.includes('refresh-token=')) return null;
  // 최근에 리프레시했으면 스킵
  const lastRefreshed = RegExp(/last-refreshed=([^;]+)/).exec(cookie)?.[1];
  if (lastRefreshed) {
    const elapsed = Date.now() - parseInt(lastRefreshed, 10);
    if (elapsed < 30_000) return null; // 30초 내 스킵
  }
  try {
    const res = await fetch(new URL('/api/refresh', request.url).toString(), {
      method: 'POST',
      headers: { cookie },
    });
    return res.ok ? ((await res.json()) as AuthResponseType) : null;
  } catch (error) {
    // 네트워크 에러 시 무시하고 기존 토큰으로 진행
    console.warn('Middleware refresh failed:', error);
    return null;
  }
}

export async function refreshSessionInMiddleware(response: NextResponse, refreshed: AuthResponseType) {
  if (!refreshed) {
    response.cookies.set({ name: 'session', value: '', expires: new Date(0), path: '/' });
    response.cookies.set({ name: 'refresh-token', value: '', expires: new Date(0), path: '/' });
    response.cookies.set({ name: 'auth-token', value: '', expires: new Date(0), path: '/' });
    return null;
  }
  const { userId, accessToken, refreshToken: newRefreshToken } = refreshed;
  const newExpiresAt = Date.now() + SESSION_TTL;
  const sessionToken = await encrypt({ userId, expiresAt: newExpiresAt });
  response.cookies.set({
    name: 'session',
    value: sessionToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(newExpiresAt),
    sameSite: 'lax',
    path: '/',
  });
  response.cookies.set({
    name: 'refresh-token',
    value: newRefreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + REFRESH_TTL),
    sameSite: 'lax',
    path: '/',
  });
  response.cookies.set({
    name: 'auth-token',
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + ACCESS_TTL),
    sameSite: 'lax',
    path: '/',
  });

  return { isAuth: true, userId, expiresAt: newExpiresAt };
}
