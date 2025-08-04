import Container from '@/atoms/Container';
import TimeChart from '@/organisms/TimeChart';
import ActivityCalendar from '@/organisms/ActivityCalendar';
import { TimeFutureType, TimePastType } from '@/types/time.type';
import TimeFutureProgress from '@/organisms/TimeFutureProgress';
import Typography from '@/atoms/Typography';
import { Separator } from '@/components/ui/separator';

type TimeTemplateProps = {
  pasts: TimePastType[];
  futures: TimeFutureType[];
};

export default function TimeTemplate(props: TimeTemplateProps) {
  const { pasts, futures } = props;
  return (
    <Container direction="column" className="px-4">
      <Container className="justify-center items-center">
        <ActivityCalendar pasts={pasts} />
        <TimeChart pasts={pasts} />
      </Container>
      <Separator />
      <Typography.h3 className="py-4">미래</Typography.h3>
      <Container direction="column" className="gap-4">
        {futures.map((future) => (
          <TimeFutureProgress key={future.id} futureBox={future} />
        ))}
      </Container>
    </Container>
  );
}
