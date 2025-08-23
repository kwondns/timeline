import Container from '@/atoms/Container';
import Typography from '@/atoms/Typography';
import { Separator } from '@/components/ui/separator';
import ActivityCalendar from '@/organisms/ActivityCalendar';
import { getTranslations } from 'next-intl/server';

type TimeTemplateProps = {
  activitySlot: React.ReactNode;
  timeChartSlot: React.ReactNode;
  futuresSlot: React.ReactNode;
};

export default async function TimeTemplate(props: TimeTemplateProps) {
  const { activitySlot, timeChartSlot, futuresSlot } = props;

  const t = await getTranslations('Time');

  return (
    <Container direction="column" className="px-4">
      <Container className="justify-center items-center flex-col md:flex-row">
        <ActivityCalendar activitySlot={activitySlot} />
        <div className="h-[300px] w-full overflow-x-hidden active:outline-none focus:outline-none">{timeChartSlot}</div>
      </Container>
      <Separator />
      <Typography.h3 className="py-4">{t('future')}</Typography.h3>
      <Container direction="column" className="gap-4">
        {futuresSlot}
      </Container>
    </Container>
  );
}
