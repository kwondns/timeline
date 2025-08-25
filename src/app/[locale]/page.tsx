import SplashTemplate from '@/templates/Splash.template';
import { cookies } from 'next/headers';
import { redirect } from '@/i18n/navigation';
import { Locale } from '@/i18n/routing';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles = {
    ko: 'Timeline - 시간의 흐름을 기록하다',
    en: 'Timeline - Record the Flow of Time',
  };

  return {
    title: titles[locale as keyof typeof titles],
    alternates: {
      canonical: `https://time.kwondns.com/${locale}`,
      languages: {
        'ko-KR': 'https://time.kwondns.com/ko',
        'en-US': 'https://time.kwondns.com/en',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const cookieStore = await cookies();
  const splash = cookieStore.get('splash')?.value;
  if (splash === '1') redirect({ href: '/present', locale });
  return <SplashTemplate />;
}
