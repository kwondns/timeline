import { PastActivityType } from '@/types/past.type';
import { callGetWithAuth } from '@/lib/dal/http';
import PastDynamic from '@/organisms/PastDynamic';
import { Locale } from '@/i18n/routing';
import { MONTH_NAME, PAST_METADATA } from '@/constants/METADATA';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string; locale: Locale }>;
}): Promise<Metadata> {
  const { date, locale } = await params;
  const dateDate = new Date(date);
  const year = dateDate.getFullYear();
  const month = dateDate.getUTCMonth() + 1;
  const day = dateDate.getUTCDay();
  let title: string;
  let description: string;

  if (locale === 'en' || locale === 'fr' || locale === 'es') {
    const monthName = MONTH_NAME[locale as keyof typeof MONTH_NAME][month - 1];
    title = PAST_METADATA.title[locale as keyof typeof PAST_METADATA.title]
      .replace('{year}', String(year))
      .replace('{month}', monthName)
      .replace('{day}', String(day));
    description = PAST_METADATA.description[locale as keyof typeof PAST_METADATA.description]
      .replace('{year}', String(year))
      .replace('{month}', monthName)
      .replace('{day}', String(day));
  } else {
    title = PAST_METADATA.title[locale as keyof typeof PAST_METADATA.title]
      .replace('{year}', String(year))
      .replace('{month}', String(month))
      .replace('{day}', String(day));
    description = PAST_METADATA.description[locale as keyof typeof PAST_METADATA.description]
      .replace('{year}', String(year))
      .replace('{month}', String(month))
      .replace('{day}', String(day));
  }

  return {
    title,
    description,
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale; date: string }>;
  searchParams: Promise<{ index: string }>;
}) {
  const { locale, date } = await params;
  const { index } = await searchParams;

  const todayStr = new Date().toISOString().slice(0, 10);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  let revalidate: number | false = false;
  if (date === todayStr) {
    revalidate = 300; // 오늘: 5분 ISR
  } else if (date === yesterdayStr) {
    revalidate = 21600; // 어제: 6시간 ISR
  }

  const activities = await callGetWithAuth<PastActivityType[]>(`/past/${date}`, {
    next: { revalidate },
    tag: `past-${date}`,
  });

  return <PastDynamic locale={locale} activities={activities} defaultOpenIndex={index} />;
}
