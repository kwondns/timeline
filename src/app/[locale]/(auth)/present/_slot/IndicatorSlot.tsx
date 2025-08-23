import Indicator from '@/molecules/Indicator';
import Typography from '@/atoms/Typography';
import { getLocale } from 'next-intl/server';

export default async function IndicatorSlot({ startTime }: { startTime: string }) {
  const locale = await getLocale();
  return (
    <>
      <Indicator active={!!startTime} />
      <Typography.h4 className="text-primary/70">
        {startTime ? new Date(startTime).toLocaleString(locale, { timeZone: 'Asia/Seoul' }) : ''}
      </Typography.h4>
    </>
  );
}
