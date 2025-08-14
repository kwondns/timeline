'use client';
import Typography from '@/atoms/Typography';
import { useEffect, useRef, useState } from 'react';
import { calculateDateDiff } from '@/lib/date';

export default function PresentTimeClient({ startTime, initialDiff }: { startTime: string; initialDiff: string }) {
  const [diff, setDiff] = useState(initialDiff);

  const timeoutRef = useRef<NodeJS.Timeout>();
  const intervalRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    const current = new Date();
    // 1) 다음 정각까지 남은 시간 계산 (밀리초)
    const msUntilNextMinute = (60 - current.getSeconds()) * 1000 - current.getMilliseconds();

    // 2) 첫 번째 업데이트: 남은 시간 후에 정확히 실행
    timeoutRef.current = setTimeout(() => {
      setDiff(calculateDateDiff(startTime, new Date()));

      // 3) 이후 1분(60,000ms)마다 업데이트
      intervalRef.current = setInterval(() => {
        setDiff(calculateDateDiff(startTime, new Date()));
      }, 60 * 1000);
    }, msUntilNextMinute);

    // 4) cleanup
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startTime]);

  return <Typography.h2 className="!pb-0">{diff}</Typography.h2>;
}
