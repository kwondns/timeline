import { PastListType } from '@/types/past.type';
import Container from '@/atoms/Container';
import TimeChart from '@/organisms/TimeChart';
import ActivityCalendar from '@/organisms/ActivityCalendar';

type TimeTemplateProps = {
  pasts: PastListType[];
};

export default function TimeTemplate(props: TimeTemplateProps) {
  const { pasts } = props;
  return (
    <Container direction="column" className="px-4">
      <Container className="justify-center items-center">
        <ActivityCalendar pasts={pasts} />
        <TimeChart pasts={pasts} />
      </Container>
    </Container>
  );
}
