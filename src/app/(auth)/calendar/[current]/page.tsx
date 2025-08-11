import CalendarTemplate from '@/templates/Calendar.template';
import { PastListType } from '@/types/past.type';

export default async function Page({ params }: { params: Promise<{ current: string }> }) {
  const { current: currentString } = await params;
  const current = new Date(currentString);

  const thisMonthString = new Date().toISOString().slice(0, 7);

  const response = await fetch(`${process.env.API_SERVER_URL}/past/calendar/${currentString}`, {
    method: 'GET',
    next: { revalidate: thisMonthString === currentString ? 3600 : false },
  });

  const pasts = (await response.json()) as PastListType[];

  return <CalendarTemplate current={current} pasts={pasts}></CalendarTemplate>;
}
