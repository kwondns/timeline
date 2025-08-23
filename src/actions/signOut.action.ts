'use server';

import { callFetchForAction } from '@/lib/dal/http';
import { destroySession } from '@/lib/auth/session';
import { redirect } from '@/i18n/navigation';
import { cookies } from 'next/headers';
import { Locale } from '@/i18n/routing';

export async function signOutAction() {
  await callFetchForAction('/user/sign-out', {}, { method: 'POST', expectNoContent: true, auth: true });
  await destroySession();
  const locale = (await cookies()).get('NEXT_LOCALE')?.value ?? 'ko';
  redirect({ href: '/sign/in', locale: locale as Locale });
}
