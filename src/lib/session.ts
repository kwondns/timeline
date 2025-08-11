'use server';

import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { setCookie } from '@/lib/cookie';
import { refresh } from '@/lib/refresh';

export interface SessionPayload extends JWTPayload {
  userId: string;
  expiresAt: number;
}

const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, { algorithms: ['HS256'] });
    return payload as SessionPayload;
  } catch (e) {
    return null;
  }
}

export async function createSession(userId: string) {
  const expiresAt = 1000 * 60 * 60;
  const session = await encrypt({ userId, expiresAt: Date.now() + expiresAt });
  await setCookie('session', session, expiresAt);
}

const SESSION_TTL = 1000 * 60 * 60;
const ACCESS_TTL = 1000 * 60 * 15;
const REFRESH_TTL = 1000 * 60 * 60 * 24 * 7;
const REFRESH_THRESHOLD = 47 * 60 * 1000;
export async function verifySession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('session')?.value;
  let session = await decrypt(cookie);
  if (!session?.userId) return null;

  const now = Date.now();
  const timeLeft = session.expiresAt - now;
  if (timeLeft > REFRESH_THRESHOLD) {
    return { isAuth: true, userId: session.userId, expiresAt: session.expiresAt };
  }
  const refreshToken = cookieStore.get('refresh-token')?.value;
  if (!refreshToken) return null;

  const refreshed = await refresh(refreshToken);
  if (!refreshed) return null;

  const { userId, accessToken, refreshToken: newRefreshToken } = refreshed;
  const newExpiresAt = Date.now() + SESSION_TTL;
  const sessionToken = await encrypt({ userId, expiresAt: newExpiresAt });
  cookieStore.set({
    name: 'session',
    value: sessionToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(newExpiresAt),
    sameSite: 'lax',
    path: '/',
  });
  cookieStore.set({
    name: 'refresh-token',
    value: newRefreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + REFRESH_TTL),
    sameSite: 'lax',
    path: '/',
  });
  cookieStore.set({
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

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}
