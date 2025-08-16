'use server';

import { AuthResponseType } from '@/types/auth.type';
import { cookies } from 'next/headers';
import { NoRefreshTokenError } from '@/lib/error';
import { refreshSession } from '@/lib/session';

export async function refresh(refreshToken?: string): Promise<null | AuthResponseType> {
  if (!refreshToken) return null;

  const res = await fetch(`${process.env.API_SERVER_URL}/user/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `refresh-token=${refreshToken}`,
    },
  });
  if (!res.ok) return null;
  return (await res.json()) as AuthResponseType;
}

export async function validateRefreshToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh-token')?.value;
  if (!refreshToken) {
    throw new NoRefreshTokenError();
  }
  return refreshToken;
}

async function tryRefreshSessionOnce(): Promise<boolean> {
  try {
    const refreshToken = await validateRefreshToken();
    const newSession = await refresh(refreshToken);
    if (!newSession) return false;
    await refreshSession(newSession);
    return true;
  } catch (e) {
    if (e instanceof NoRefreshTokenError) return false;
    throw e;
  }
}
