import { PastListType } from '@/types/past.type';
import CalendarContent from '@/organisms/CalendarContent';
import { callGetWithAuth } from '@/lib/dal/http';
import { Suspense } from 'react';
import { Locale } from '@/i18n/routing';
import { Metadata } from 'next';
import { CALENDAR_METADATA, MONTH_NAME } from '@/constants/METADATA';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ current: string; locale: Locale }>;
}): Promise<Metadata> {
  const { current, locale } = await params;
  const currentDate = new Date(current);
  const month = currentDate.getUTCMonth() + 1;
  const year = currentDate.getFullYear();
  let title;
  let description;

  if (locale === 'en' || locale === 'fr' || locale === 'es') {
    const monthName = MONTH_NAME[locale as keyof typeof MONTH_NAME][month - 1];
    title = CALENDAR_METADATA.title[locale as keyof typeof CALENDAR_METADATA.title]
      .replace('{year}', String(year))
      .replace('{month}', monthName);
    description = CALENDAR_METADATA.description[locale as keyof typeof CALENDAR_METADATA.description]
      .replace('{year}', String(year))
      .replace('{month}', monthName);
  } else {
    title = CALENDAR_METADATA.title[locale as keyof typeof CALENDAR_METADATA.title]
      .replace('{year}', String(year))
      .replace('{month}', String(month));
    description = CALENDAR_METADATA.description[locale as keyof typeof CALENDAR_METADATA.description]
      .replace('{year}', String(year))
      .replace('{month}', String(month));
  }

  return {
    title,
    description,
  };
}

export default async function Page({ params }: { params: Promise<{ current: string }> }) {
  const { current: currentString } = await params;

  const thisMonthString = new Date().toISOString().slice(0, 7);

  const pasts = await callGetWithAuth<PastListType[]>(`/past/calendar/${currentString}`, {
    next: {
      revalidate: thisMonthString === currentString ? 3600 : false,
    },
    tag: `calendar-${currentString}`,
  });

  return (
    <Suspense>
      <CalendarContent pasts={pasts} />
    </Suspense>
  );
}
