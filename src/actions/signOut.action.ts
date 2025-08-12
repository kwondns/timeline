'use server';

import { callFetch } from '@/lib/dal/http';
import { destroySession } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function signOutAction() {
  await callFetch('/user/sign-out', {}, { method: 'POST', expectNoContent: true, auth: true });
  await destroySession();
  redirect('/sign/in');
}
