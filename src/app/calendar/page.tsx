import CalendarTemplate from '@/templates/Calendar.template';
import { PastListType } from '@/types/past.type';

export async function getPastCalendar(date: string): Promise<PastListType[]> {
  const pasts = await fetch(`${process.env.API_SERVER_URL}/past/calendar/${date}`, { method: 'GET' });
  return pasts.json();
}

export default async function Page() {
  const currentString = new Date().toISOString().slice(0, 7);
  const current = new Date(currentString);
  const pasts = await getPastCalendar(currentString);

  return <CalendarTemplate current={current} pasts={pasts}></CalendarTemplate>;
}
