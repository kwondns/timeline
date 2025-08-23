'use server';
import { cache } from 'react';
import { verifySession } from '@/lib/auth/session';
import { callGetWithAuth } from '@/lib/dal/http';

type UserReturnType = {
  userId: string;
  name: string;
};

export const getCallUser = cache(async () => {
  return await callGetWithAuth<UserReturnType>('/user/me', {
    next: { revalidate: false },
    tag: 'user',
  });
});

export async function getUser(): Promise<null | UserReturnType> {
  const session = await verifySession();
  if (!session) return null;
  return getCallUser();
}
