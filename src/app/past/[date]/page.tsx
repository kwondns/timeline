import PastTemplate from '@/templates/Past.template';
import { PastActivityType } from '@/types/past.type';

async function getActivities(date: string): Promise<PastActivityType[]> {
  const result = await fetch(`${process.env.API_SERVER_URL}/past/${date}`, { method: 'GET' });
  return result.json();
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

  const activities = await getActivities(date);

  return <PastTemplate date={date} activities={activities} defaultOpenIndex={index} />;
}
