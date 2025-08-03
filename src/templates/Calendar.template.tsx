import Calendar from '@/organisms/Calendar';
import Container from '@/atoms/Container';
import CalendarController from '@/organisms/CalendarController';
import { PastType } from '@/types/past.type';

type CalendarTemplateProps = { current: Date; pasts: PastType[] };

export default function CalendarTemplate(props: CalendarTemplateProps) {
  const { current, pasts } = props;

  return (
    <Container direction="column" className="h-full">
      <CalendarController current={current} />
      <Calendar current={current} pasts={pasts} />
    </Container>
  );
}
