import CalendarTemplate from '@/templates/Calendar.template';
import Mock from '@/mocks/pastCalendar.mock';

export default async function Page({ params }: { params: Promise<{ current: string }> }) {
  const { current: currentString } = await params;
  const current = new Date(currentString);

  return <CalendarTemplate current={current} pasts={Mock}></CalendarTemplate>;
}
