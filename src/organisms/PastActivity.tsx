import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PastActivityType } from '@/types/past.type';
import Typography from '@/atoms/Typography';
import Markdown from '@/organisms/Markdown';
import Container from '@/atoms/Container';
import { fromToDiffDateFormat } from '@/lib/date';

type PastActivityProps = {
  activities: PastActivityType[];
  defaultOpenIndex?: string;
};
export default function PastActivity(props: PastActivityProps) {
  const { activities, defaultOpenIndex } = props;
  return (
    <Accordion type="multiple" defaultValue={defaultOpenIndex ? [defaultOpenIndex] : ['0']}>
      {activities.map((activity, index) => (
        <AccordionItem key={activity.id} value={String(index)}>
          <AccordionTrigger>
            <Container className="justify-between flex-1">
              <Typography.h4>{activity.title}</Typography.h4>
              <Typography.p>{fromToDiffDateFormat(activity.startTime, activity.endTime)}</Typography.p>
            </Container>
          </AccordionTrigger>
          <AccordionContent>
            <Markdown source={activity.content} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
