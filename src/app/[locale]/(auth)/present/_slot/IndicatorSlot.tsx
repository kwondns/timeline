import Indicator from '@/molecules/Indicator';
import Typography from '@/atoms/Typography';

export default function IndicatorSlot({ startTime }: { startTime: string }) {
  return (
    <>
      <Indicator active={!!startTime} />
      <Typography.h4 className="text-primary/70">
        {startTime ? new Date(startTime).toLocaleString('ko-kr', { timeZone: 'Asia/Seoul' }) : ''}
      </Typography.h4>
    </>
  );
}
