'use server';
import { cache } from 'react';
import { verifySession } from '@/lib/session';
import { callGetWithAuth } from '@/lib/dal/http';

type UserReturnType = {
  userId: string;
  name: string;
};

export const getCallUser = cache(async () => {
  return await callGetWithAuth<UserReturnType>('/user/me');
});

export async function getUser(): Promise<null | boolean>;
export async function getUser(callUser: true): Promise<UserReturnType | null>;
export async function getUser(callUser: boolean = false): Promise<null | boolean | UserReturnType> {
  const session = await verifySession();
  if (!session) return null;
  if (callUser) return getCallUser();
  return true;
}
