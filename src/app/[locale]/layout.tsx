import './globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { hasLocale } from 'use-intl';
import { Locale, LOCALE, routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { Metadata } from 'next';
import { ROOT_METADATA } from '@/constants/METADATA';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: ROOT_METADATA[locale].title,
    description: ROOT_METADATA[locale].description,
    keywords: [...ROOT_METADATA[locale].keywords],
    authors: [{ name: 'kwondns' }],
    creator: 'kwondns',
    publisher: 'Timeline',
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      siteName: 'Timeline',
      locale: 'ko_KR',
      alternateLocale: ['en_US', 'ja_JP', 'es_ES', 'fr_FR', 'zh_CN'],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@kwondns',
    },
    alternates: {
      canonical: 'https://time.kwondns.com',
      languages: {
        ko: 'https://time.kwondns.com/ko',
        en: 'https://time.kwondns.com/en',
        ja: 'https://time.kwondns.com/ja',
        fr: 'https://time.kwondns.com/fr',
        es: 'https://time.kwondns.com/es',
        'zh-cn': 'https://time.kwondns.com/zh-cn',
      },
    },
  };
}

export async function generateStaticParams() {
  // 로케일별 정적 경로 생성
  return LOCALE.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: Locale }> }>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="bg-background h-dvh">
        <NextIntlClientProvider locale={locale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            themes={['light', 'dark', 'system']}
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors expand={false} position="top-right" />
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
