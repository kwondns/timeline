import { PastActivityType } from '@/types/past.type';
import { callGetWithAuth } from '@/lib/dal/http';
import PastDynamic from '@/organisms/PastDynamic';
import { getTokenAndUserId } from '@/lib/dal/auth';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ date: string }>;
  searchParams: Promise<{ index: string }>;
}) {
  const { date } = await params;
  const { index } = await searchParams;

  const { userId, token } = await getTokenAndUserId();
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
    method: 'GET',
    next: { revalidate, tags: [`past-${userId}-${date}`] },
    userId,
    token,
  });

  return <PastDynamic activities={activities} defaultOpenIndex={index} />;
}
