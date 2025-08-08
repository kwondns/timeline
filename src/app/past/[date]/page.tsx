import PastTemplate from '@/templates/Past.template';
import { PastActivityType } from '@/types/past.type';

export const dynamic = 'force-static';
export const dynamicParams = true;

export async function generateStaticParams() {
  const params: { date: string }[] = [];
  const today = new Date();
  // 과거 31일 중 2일 이전 날짜만 SSG로 생성
  for (let i = 2; i <= 31; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    params.push({ date: d.toISOString().slice(0, 10) });
  }
  return params;
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ date: string }>;
  searchParams: Promise<{ index: string }>;
}) {
  const { date } = await params;
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

  const response = await fetch(`${process.env.API_SERVER_URL}/past/${date}`, {
    method: 'GET',
    next: { revalidate },
  });
  const activities = (await response.json()) as PastActivityType[];

  return <PastTemplate date={date} activities={activities} defaultOpenIndex={index} />;
}
