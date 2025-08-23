import CalendarTemplate from '@/templates/Calendar.template';
import { Locale } from '@/i18n/routing';

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
  params: Promise<{ locale: Locale; current: string }>;
}) {
  const { locale, current: currentString } = await params;
  const current = new Date(currentString === undefined ? new Date().toISOString().slice(0, 7) : currentString);
  return (
    <CalendarTemplate locale={locale} current={current}>
      {children}
    </CalendarTemplate>
  );
}
