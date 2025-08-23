import { PastActivityType } from '@/types/past.type';
import { callGetWithAuth } from '@/lib/dal/http';
import PastDynamic from '@/organisms/PastDynamic';
import { Locale } from '@/i18n/routing';

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
