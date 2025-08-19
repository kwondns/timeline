'use server';

import { callFetchForAction } from '@/lib/dal/http';
import { AuthResponseType } from '@/types/auth.type';
import { createSession } from '@/lib/auth/session';
import { setCookie } from '@/lib/auth/cookie';
import { z } from 'zod';
import { SignInSchema } from '@/schemas/signIn.schema';

type SignInDemoType = z.infer<typeof SignInSchema>;

export default async function signInToDemoAction() {
  try {
    const { userId, accessToken, refreshToken } = await callFetchForAction<SignInDemoType, AuthResponseType>(
      '/user/sign-in',
      {
        email: process.env.DEMO_EMAIL,
        password: process.env.DEMO_PASSWORD,
      },
      {
        method: 'POST',
        credentials: 'include',
      },
    );
    await createSession(userId);
    await setCookie('refresh-token', refreshToken, 1000 * 60 * 60 * 24 * 7);
    await setCookie('auth-token', accessToken, 1000 * 60 * 15);
  } catch (e) {
    const error = e as Error;
    return {
      success: false,
      error: error.message,
    };
  }
}
