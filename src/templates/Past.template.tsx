import PastActivity from '@/organisms/PastActivity';
import { PastActivityType } from '@/types/past.type';
import Container from '@/atoms/Container';
import Typography from '@/atoms/Typography';
import { calculateDateDiff, formattingDateDiff } from '@/lib/date';

type PastTemplateProps = {
  date: string;
  activities: PastActivityType[];
  defaultOpenIndex?: string;
};

export default function PastTemplate(props: PastTemplateProps) {
  const { activities, date, defaultOpenIndex } = props;
  const totalActivityTime = activities.reduce(
    (acc, activity) => acc + (calculateDateDiff(activity.startTime, activity.endTime, true) as number),
    0,
  );
  return (
    <Container direction="column" className="gap-4 h-full">
      <Container className="justify-between">
        <Typography.h2>{new Intl.DateTimeFormat('ko-kr').format(new Date(date))}</Typography.h2>
        <Typography.h4>{formattingDateDiff(Math.floor(totalActivityTime))}</Typography.h4>
      </Container>
      {activities.length > 0 ? (
        <PastActivity activities={activities} defaultOpenIndex={defaultOpenIndex} />
      ) : (
        <Container className="size-full justify-center items-center">
          <Typography.span className="text-foreground/70 h-full content-center">작업내용이 없습니다!</Typography.span>
        </Container>
      )}
    </Container>
  );
}
