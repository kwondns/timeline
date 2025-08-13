import CalendarTemplate from '@/templates/Calendar.template';

export const experimental_ppr = true;
export async function generateStaticParams() {
  const params: { current: string }[] = [];
  const today = new Date();
  for (let i = -5; i <= 5; i++) {
    const targetDate = new Date(today);
    targetDate.setMonth(today.getUTCMonth() - i);
    params.push({ current: targetDate.toISOString().slice(0, 7) });
  }
  return params;
}
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ current: string }>;
}) {
  const { current: currentString } = await params;
  const current = new Date(currentString === undefined ? new Date().toISOString().slice(0, 7) : currentString);
  return <CalendarTemplate current={current}>{children}</CalendarTemplate>;
}
