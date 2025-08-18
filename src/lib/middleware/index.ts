import { NextRequest } from 'next/server';
import { decrypt, SessionPayload } from '@/lib/auth/session';

export async function verifySessionInMiddleware(request: NextRequest): Promise<SessionPayload | null> {
  const sessionCookie = request.cookies.get('session')?.value;
  if (!sessionCookie) return null;

  let session = await decrypt(sessionCookie);
  if (!session) return null;

  if (!session?.userId) return null;

  const nowSec = Math.floor(Date.now() / 1000);

  if (session.exp && session.exp <= nowSec) return null;

  return { isAuth: true, userId: session.userId, expiresAt: session.expiresAt };
}
