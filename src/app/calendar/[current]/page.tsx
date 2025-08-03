import CalendarTemplate from '@/templates/Calendar.template';

export default async function Page({ params }: { params: { current: string } }) {
  const { current: currentString } = await params;
  const current = new Date(currentString);

  return <CalendarTemplate current={current}></CalendarTemplate>;
}
