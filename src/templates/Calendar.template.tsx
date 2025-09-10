import Container from '@/atoms/Container';
import CalendarController from '@/organisms/CalendarController';
import Calendar from '@/organisms/Calendar';
import { Locale } from '@/i18n/routing';

type CalendarTemplateProps = { locale: Locale; current: Date; children: React.ReactNode };

export default function CalendarTemplate(props: Readonly<CalendarTemplateProps>) {
  const { locale, current, children } = props;

  return (
    <Container direction="column" className="h-full">
      <CalendarController current={current} />
      <Calendar locale={locale} current={current} />
      {children}
    </Container>
  );
}
