'use server';

import { AuthResponseType } from '@/types/auth.type';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

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

export async function validateCookie() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh-token')?.value;
  if (!refreshToken) {
    redirect('/sign/in?toast=loginRequired');
  }
  return refreshToken;
}
