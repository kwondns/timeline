'use client';

import Indicator from '@/molecules/Indicator';
import Typography from '@/atoms/Typography';
import { usePresentActions } from '@/templates/PresentClient.template';

export default function IndicatorSlot() {
  const { startTime } = usePresentActions();
  return (
    <>
      <Indicator active={!!startTime} />
      <Typography.h4 className="text-primary/70">
        {startTime ? new Date(startTime).toLocaleString('ko-kr') : ''}
      </Typography.h4>
    </>
  );
}
