import CalendarTemplate from '@/templates/Calendar.template';

export default async function Page() {
  const currentString = new Date().toISOString().slice(0, 7);
  const current = new Date(currentString);

  return <CalendarTemplate current={current}></CalendarTemplate>;
}
