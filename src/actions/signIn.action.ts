'use server';

import { z } from 'zod';
import { callFetch } from '@/lib/fetch';

const SignInSchema = z.object({
  id: z.string(),
  password: z.string(),
});
export default async function signInAction(_: any, formData: FormData) {
  const id = formData.get('id');
  const password = formData.get('password');
  const payload = { id, password };
  const body = SignInSchema.parse(payload);
  try {
    await callFetch('/sign', body, { credentials: 'include' });
    return true;
  } catch (e) {
    return false;
  }
}
