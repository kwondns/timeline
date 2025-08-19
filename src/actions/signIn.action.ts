'use server';

import { z } from 'zod';
import { callFetchForAction } from '@/lib/dal/http';
import { createSession } from '@/lib/auth/session';
import { setCookie } from '@/lib/auth/cookie';
import { SignInSchema } from '@/schemas/signIn.schema';
import { AuthResponseType } from '@/types/auth.type';

type SignInType = z.infer<typeof SignInSchema>;

type PayloadType = { email: string; password: string };
export default async function signInAction(payload: PayloadType) {
  const body = SignInSchema.safeParse(payload);
  if (!body.success) return { errors: z.treeifyError(body.error).properties };

  const { userId, accessToken, refreshToken } = await callFetchForAction<SignInType, AuthResponseType>(
    '/user/sign-in',
    body.data,
    {
      method: 'POST',
      credentials: 'include',
    },
  );
  await createSession(userId);
  await setCookie('refresh-token', refreshToken, 1000 * 60 * 60 * 24 * 7);
  await setCookie('auth-token', accessToken, 1000 * 60 * 15);
}
