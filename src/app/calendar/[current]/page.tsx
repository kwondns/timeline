import CalendarTemplate from '@/templates/Calendar.template';
import { getPastCalendar } from '@/app/calendar/page';

export default async function Page({ params }: { params: Promise<{ current: string }> }) {
  const { current: currentString } = await params;
  const current = new Date(currentString);

  const pasts = await getPastCalendar(currentString);

  return <CalendarTemplate current={current} pasts={pasts}></CalendarTemplate>;
}
