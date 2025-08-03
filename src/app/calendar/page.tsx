import CalendarTemplate from '@/templates/Calendar.template';
import Mock from '@/mocks/pastCalendar.mock';

export default async function Page() {
  const currentString = new Date().toISOString().slice(0, 7);
  const current = new Date(currentString);

  return <CalendarTemplate current={current} pasts={Mock}></CalendarTemplate>;
}
