import Typography from '@/atoms/Typography';
import { calculateDateDiff, formattingDateDiff } from '@/lib/utils/date';
import PastActivity from '@/organisms/PastActivity';
import Container from '@/atoms/Container';
import { PastActivityType } from '@/types/past.type';
import { getTranslations } from 'next-intl/server';
import { Locale } from '@/i18n/routing';

type PastDynamicProps = {
  locale: Locale;
  activities: PastActivityType[];
  defaultOpenIndex?: string;
};
export default async function PastDynamic(props: PastDynamicProps) {
  const { locale, activities, defaultOpenIndex } = props;
  const t = await getTranslations({ locale });
  const totalActivityTime = activities.length
    ? activities.reduce((acc, activity) => acc + calculateDateDiff(activity.startTime, activity.endTime, true), 0)
    : 0;

  return (
    <>
      <Typography.h4 className="absolute top-1 right-2">
        {formattingDateDiff(Math.floor(totalActivityTime), locale)}
      </Typography.h4>
      {activities.length > 0 ? (
        <PastActivity activities={activities} defaultOpenIndex={defaultOpenIndex} />
      ) : (
        <Container className="size-full justify-center items-center">
          <Typography.span className="text-foreground/70 h-full content-center">{t('Past.noContent')}</Typography.span>
        </Container>
      )}
    </>
  );
}
