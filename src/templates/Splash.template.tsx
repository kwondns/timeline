// oxlint-disable click-events-have-key-events
'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/atoms/Icon';
import Typography from '@/atoms/Typography';
import { useRouter } from 'next/navigation';

export default function SplashTemplate({ duration = 500 }) {
  const route = useRouter();
  const [progress, setProgress] = useState(0);

  const handleComplete = () => {
    setTimeout(() => route.replace('/present'), 100);
  };
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // oxlint-disable-next-line exhaustive-deps
          handleComplete();
          return 100;
        }
        return prev + 2;
      });
    }, duration / 50);

    return () => clearInterval(progressInterval);
  }, [duration]);

  const handleSkip = () => {
    handleComplete();
  };

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center cursor-pointer"
    >
      <div className="text-center space-y-6">
        {/* 메인 로고 */}
        <div className="relative">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <div className="text-3xl text-primary animate-bounce">{Icon.time}</div>
          </div>
          <Typography.h1 variant="h1" className="text-3xl font-bold">
            Timeline
          </Typography.h1>
          <Typography.p variant="p" className="text-muted-foreground text-sm mt-2">
            시간의 흐름을 기록하다
          </Typography.p>
        </div>

        {/* 프로그레스 서클 */}
        <div className="relative w-20 h-20 mx-auto">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-muted stroke-current"
              strokeDasharray="100, 100"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              strokeWidth="2"
            />
            <path
              className="text-primary stroke-current transition-all duration-100"
              strokeDasharray={`${progress}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Typography.span variant="small" className="text-primary font-semibold">
              {Math.round(progress)}%
            </Typography.span>
          </div>
        </div>

        {/* 스킵 안내 */}
        <Typography.span variant="small" className="text-muted-foreground opacity-60 animate-pulse">
          화면을 클릭하여 건너뛰기
        </Typography.span>
      </div>
    </div>
  );
}
