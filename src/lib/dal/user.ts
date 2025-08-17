'use server';
import { cache } from 'react';
import { verifySession } from '@/lib/session';
import { callGetWithAuth } from '@/lib/dal/http';

type UserReturnType = {
  userId: string;
  name: string;
};

export const getCallUser = cache(async (userId: string, token: string) => {
  return await callGetWithAuth<UserReturnType>('/user/me', { next: { tags: [`user-${userId}`] }, userId, token });
});

export async function getUser(userId: string, token: string): Promise<null | UserReturnType> {
  const session = await verifySession();
  if (!session) return null;
  return getCallUser(userId, token);
}
