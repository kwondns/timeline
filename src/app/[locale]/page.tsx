import SplashTemplate from '@/templates/Splash.template';
import { cookies } from 'next/headers';
import { redirect } from '@/i18n/navigation';
import { Locale } from '@/i18n/routing';

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const cookieStore = await cookies();
  const splash = cookieStore.get('splash')?.value;
  if (splash === '1') redirect({ href: '/present', locale });
  return <SplashTemplate />;
}
