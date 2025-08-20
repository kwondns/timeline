import { TimeFutureType } from '@/types/time.type';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Typography from '@/atoms/Typography';
import Container from '@/atoms/Container';
import FutureContent from '@/molecules/FutureContent';

type TimeFutureProgressProps = {
  futureBox: TimeFutureType;
};
export default function TimeFutureProgress(props: TimeFutureProgressProps) {
  const { futureBox } = props;
  return (
    <Card className="p-4 bg-card/20 border-card-foreground/30">
      <Container className="justify-between">
        <Typography.h3>{futureBox.title}</Typography.h3>
        <Typography.span>
          {futureBox.completedFutures} / {futureBox.totalFutures}
        </Typography.span>
      </Container>
      <Container direction="column" className="gap-2">
        <Container className="flex-1 gap-2 items-center">
          <Progress value={futureBox.progressRatio * 100} />
          <Typography.p>{Math.floor(futureBox.progressRatio * 100)}%</Typography.p>
        </Container>
        {futureBox.lastCompletedFuture.length > 0 && <Typography.p>최근 완료 작업</Typography.p>}
        <Container className="gap-2 flex-1">
          {futureBox.lastCompletedFuture.map((future) => (
            <FutureContent key={future.id} {...future} />
          ))}
        </Container>
      </Container>
    </Card>
  );
}
