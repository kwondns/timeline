import CalendarTemplate from '@/templates/Calendar.template';
import { PastListType } from '@/types/past.type';

export default async function Page() {
  const currentString = new Date().toISOString().slice(0, 7);
  const current = new Date(currentString);
  const response = await fetch(`${process.env.API_SERVER_URL}/past/calendar/${currentString}`, {
    method: 'GET',
    next: { revalidate: 3600 },
  });
  const pasts = (await response.json()) as PastListType[];

  return <CalendarTemplate current={current} pasts={pasts}></CalendarTemplate>;
}
