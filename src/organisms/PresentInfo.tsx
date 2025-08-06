'use client';

import Container from '@/atoms/Container';
import ActionButtonGroup, { ActionButtonGroupProps } from '@/molecules/ActionButtonGroup';
import { Card } from '@/components/ui/card';
import Typography from '@/atoms/Typography';
import { calculateDateDiff } from '@/lib/date';
import Indicator from '@/molecules/Indicator';
import PresentInputOrDisplay from '@/molecules/PresentInputOrDisplay';
import { useEffect, useRef, useState } from 'react';

type PresentInfoProps = {
  title: string | null;
  from: Date | null;
} & Omit<ActionButtonGroupProps, 'isStarted'>;

export default function PresentInfo(props: PresentInfoProps) {
  const { from, title, onSave, onTempSave } = props;
  const [now, setNow] = useState<Date>(new Date());
  const timeoutRef = useRef<NodeJS.Timeout>();
  const intervalRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    const current = new Date();
    // 1) 다음 정각까지 남은 시간 계산 (밀리초)
    const msUntilNextMinute = (60 - current.getSeconds()) * 1000 - current.getMilliseconds();

    // 2) 첫 번째 업데이트: 남은 시간 후에 정확히 실행
    timeoutRef.current = setTimeout(() => {
      setNow(new Date());

      // 3) 이후 1분(60,000ms)마다 업데이트
      intervalRef.current = setInterval(() => {
        setNow(new Date());
      }, 60 * 1000);
    }, msUntilNextMinute);

    // 4) cleanup
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  const diff = calculateDateDiff(from ?? '', now);
  return (
    <Card className="gap-4 px-6 pt-6 bg-info-foreground/20 border-info/20">
      <Container className="justify-between items-center">
        <Indicator active={!!from} />
        <Typography.h4 className="text-primary/70">{from?.toLocaleString('ko-kr')}</Typography.h4>
      </Container>
      <PresentInputOrDisplay title={title} />
      <Container className="justify-between gap-6 items-center">
        {from ? <Typography.h2 className="!pb-0">{diff}</Typography.h2> : <div />}
        <ActionButtonGroup onTempSave={onTempSave} onSave={onSave} isStarted={!!from} />
      </Container>
    </Card>
  );
}
