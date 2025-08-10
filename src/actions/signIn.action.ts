'use server';

import { z } from 'zod';
import { callFetch } from '@/lib/fetch';
import { createSession } from '@/lib/session';
import { setCookie } from '@/lib/cookie';
import { SignInSchema } from '@/schemas/signIn.schema';

type SignInType = z.infer<typeof SignInSchema>;

type PayloadType = { email: string; password: string };
type ResponseType = { userId: string; accessToken: string; refreshToken: string };
export default async function signInAction(payload: PayloadType) {
  const body = SignInSchema.safeParse(payload);
  if (!body.success) return { errors: z.treeifyError(body.error).properties };

  const { userId, accessToken, refreshToken } = await callFetch<SignInType, ResponseType>('/user/sign-in', body.data, {
    method: 'POST',
    credentials: 'include',
  });
  await createSession(userId);
  await setCookie('refresh-token', refreshToken, 1000 * 60 * 60 * 24 * 7);
  await setCookie('auth-token', accessToken, 1000 * 60 * 15);
}
