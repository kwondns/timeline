import { cookies } from 'next/headers';

export async function setCookie(key: string, value: string, expiresAt: number) {
  const cookieStore = await cookies();
  cookieStore.set(key, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: Date.now() + expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}
