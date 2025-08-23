import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Locale, routing } from '@/i18n/routing';

export default async function RootNotFound() {
  const localeCookie = (await cookies()).get('NEXT_LOCALE')?.value;
  const locale =
    localeCookie && routing.locales.includes(localeCookie as Locale) ? localeCookie : routing.defaultLocale;
  redirect(`/${locale}/not-found`);
}
