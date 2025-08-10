import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { setCookie } from '@/lib/cookie';

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
  const session = await decrypt(cookie);
  if (!session?.userId) return null;

  return { isAuth: true, userId: session.userId };
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}
