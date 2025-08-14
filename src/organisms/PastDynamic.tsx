import Typography from '@/atoms/Typography';
import { calculateDateDiff, formattingDateDiff } from '@/lib/date';
import PastActivity from '@/organisms/PastActivity';
import Container from '@/atoms/Container';
import { PastActivityType } from '@/types/past.type';

type PastDynamicProps = {
  activities: PastActivityType[];
  defaultOpenIndex?: string;
};
export default function PastDynamic(props: PastDynamicProps) {
  const { activities, defaultOpenIndex } = props;
  const totalActivityTime = activities.length
    ? activities.reduce(
        (acc, activity) => acc + (calculateDateDiff(activity.startTime, activity.endTime, true) as number),
        0,
      )
    : 0;

  return (
    <>
      <Typography.h4 className="absolute top-1 right-2">
        {formattingDateDiff(Math.floor(totalActivityTime))}
      </Typography.h4>
      {activities.length > 0 ? (
        <PastActivity activities={activities} defaultOpenIndex={defaultOpenIndex} />
      ) : (
        <Container className="size-full justify-center items-center">
          <Typography.span className="text-foreground/70 h-full content-center">작업내용이 없습니다!</Typography.span>
        </Container>
      )}
    </>
  );
}
