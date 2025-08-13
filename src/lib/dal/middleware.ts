import { NextRequest, NextResponse } from 'next/server';
import { decrypt, encrypt } from '@/lib/session';
import { AuthResponseType } from '@/types/auth.type';

const SESSION_TTL = 1000 * 60 * 60;
const ACCESS_TTL = 1000 * 60 * 15;
const REFRESH_TTL = 1000 * 60 * 60 * 24 * 7;
const REFRESH_THRESHOLD = 47 * 60 * 1000;

export async function verifySessionInMiddleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value;
  if (!sessionCookie) return null;

  const accessCookie = request.cookies.get('auth-token')?.value;
  if (!accessCookie) return null;

  const session = await decrypt(sessionCookie);
  if (!session?.userId) return null;

  const now = Date.now();
  if (session.expiresAt - now > REFRESH_THRESHOLD) {
    return { isAuth: true, userId: session.userId, expiresAt: session.expiresAt };
  }
  return null;
}
export async function tryRefreshInMiddleware(request: NextRequest): Promise<AuthResponseType | null> {
  const cookie = request.headers.get('cookie') ?? '';
  if (!cookie.includes('refresh-token=')) return null;
  const res = await fetch(new URL('/api/refresh', request.url).toString(), {
    method: 'POST',
    headers: { cookie },
  });
  return res.ok ? ((await res.json()) as AuthResponseType) : null;
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
