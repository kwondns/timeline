import { calculateDateDiff } from '@/lib/utils/date';
import PresentTimeClient from '@/molecules/PresentTimeClient';
import { getLocale } from 'next-intl/server';

type PresentTimeProps = {
  startTime: string;
};
export default async function PresentTime(props: PresentTimeProps) {
  const { startTime } = props;

  const locale = await getLocale();
  const diff = calculateDateDiff(startTime ?? '', new Date(), false, locale);
  if (startTime) return <PresentTimeClient startTime={startTime} initialDiff={diff} />;
  return <div />;
}
