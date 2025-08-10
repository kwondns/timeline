import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { setCookie } from '@/lib/cookie';
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
  const session = await encrypt({ userId, expiresAt });
  await setCookie('session', session, expiresAt);
}

export async function verifySession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('session')?.value;
  let session = await decrypt(cookie);
  if (!session?.userId) return null;

  const now = Date.now();
  const timeLeft = session.expiresAt - now;
  if (timeLeft <= 45 * 60 * 1000) {
    const refreshResponse = await fetch(`${process.env.API_SERVER_URL}/user/refresh`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!refreshResponse.ok) return null;
    const { accessToken, userId, refreshToken } = (await refreshResponse.json()) as AuthResponseType;
    await createSession(userId);
    await setCookie('refresh-token', refreshToken, 1000 * 60 * 60 * 24 * 7);
    await setCookie('auth-token', accessToken, 1000 * 60 * 15);
    const newCookie = cookieStore.get('session')?.value;
    session = (await decrypt(newCookie)) as SessionPayload;
  }

  return { isAuth: true, userId: session.userId, expiresAt: session.expiresAt };
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}
