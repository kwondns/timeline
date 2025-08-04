import PastTemplate from '@/templates/Past.template';
import Mock from '@/mocks/pastActivity.mock';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ date: string }>;
  searchParams: Promise<{ index: string }>;
}) {
  const { date } = await params;
  const { index } = await searchParams;
  return <PastTemplate date={date} activities={Mock} defaultOpenIndex={index} />;
}
