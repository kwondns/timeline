'use server';

import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { setCookie } from '@/lib/auth/cookie';
import { AuthResponseType } from '@/types/auth.type';

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

  return null;
}

export async function refreshSession(refreshed: AuthResponseType) {
  if (!refreshed) {
    await setCookie('session', '', 0);
    await setCookie('refresh-token', '', 0);
    await setCookie('auth-token', '', 0);
    return null;
  }
  const { userId, accessToken, refreshToken: newRefreshToken } = refreshed;
  const newExpiresAt = Date.now() + SESSION_TTL;
  const sessionToken = await encrypt({ userId, expiresAt: newExpiresAt });

  await setCookie('session', sessionToken, SESSION_TTL);
  await setCookie('refresh-token', newRefreshToken, REFRESH_TTL);
  await setCookie('auth-token', accessToken, ACCESS_TTL);

  return { isAuth: true, userId, expiresAt: newExpiresAt };
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  cookieStore.delete('auth-token');
  cookieStore.delete('refresh-token');
}
