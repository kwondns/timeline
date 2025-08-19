'use server';

import { AuthResponseType } from '@/types/auth.type';
import { cookies, headers } from 'next/headers';
import { NoRefreshTokenError } from '@/lib/error';

export async function refresh(refreshToken?: string): Promise<null | AuthResponseType> {
  if (!refreshToken) return null;

  const res = await fetch(`${process.env.API_SERVER_URL}/user/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `refresh-token=${refreshToken}`,
    },
    cache: 'no-cache',
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

export async function getTokenAndUserId() {
  const token = (await cookies()).get('auth-token')?.value ?? '';
  const userId = (await headers()).get('x-user-id') ?? 'guest';
  return { token, userId };
}
