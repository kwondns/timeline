import Container from '@/atoms/Container';
import CalendarController from '@/organisms/CalendarController';
import Calendar from '@/organisms/Calendar';

type CalendarTemplateProps = { current: Date; children: React.ReactNode };

export default function CalendarTemplate(props: Readonly<CalendarTemplateProps>) {
  const { current, children } = props;

  return (
    <Container direction="column" className="h-full">
      <CalendarController current={current} />
      <Calendar current={current} />
      {children}
    </Container>
  );
}
