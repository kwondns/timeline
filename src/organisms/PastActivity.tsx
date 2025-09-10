import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PastActivityType } from '@/types/past.type';
import Typography from '@/atoms/Typography';
import MarkdownViewerClient from '@/organisms/MarkdownViewer.client';
import Container from '@/atoms/Container';
import { fromToDiffDateFormat } from '@/lib/utils/date';
import { getLocale, getTranslations } from 'next-intl/server';

type PastActivityProps = {
  activities: PastActivityType[];
  defaultOpenIndex?: string;
};
export default async function PastActivity(props: PastActivityProps) {
  const locale = await getLocale();
  const t = await getTranslations('Date');
  const { activities, defaultOpenIndex } = props;
  return (
    <Accordion type="multiple" defaultValue={defaultOpenIndex ? [defaultOpenIndex] : ['0']}>
      {activities.map((activity, index) => (
        <AccordionItem key={activity.id} value={String(index)}>
          <AccordionTrigger>
            <Container className="justify-between flex-1">
              <Typography.h4>{activity.title}</Typography.h4>
              <Typography.p>
                {fromToDiffDateFormat(
                  activity.startTime,
                  activity.endTime,
                  t as (key: string, values?: Record<string, any>) => string,
                  locale,
                )}
              </Typography.p>
            </Container>
          </AccordionTrigger>
          <AccordionContent>
            <MarkdownViewerClient source={activity.content} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
