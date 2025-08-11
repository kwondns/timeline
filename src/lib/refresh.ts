import { AuthResponseType } from '@/types/auth.type';
import { cookies } from 'next/headers';

export async function refresh(refreshToken?: string): Promise<null | AuthResponseType> {
  if (!refreshToken) return null;
  const cookieStore = await cookies();

  const res = await fetch(`${process.env.API_SERVER_URL}/user/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `refresh-token=${refreshToken}`,
    },
  });
  if (!res.ok) {
    cookieStore.set({ name: 'session', value: '', expires: new Date(0), path: '/' });
    cookieStore.set({ name: 'refresh-token', value: '', expires: new Date(0), path: '/' });
    cookieStore.set({ name: 'auth-token', value: '', expires: new Date(0), path: '/' });
  }
  return (await res.json()) as AuthResponseType;
}
