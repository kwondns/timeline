import TimeTemplate from '@/templates/Time.template';
import ActivitySlot from '@/app/(auth)/time/_slot/ActivitySlot';
import TimeChartSlot from '@/app/(auth)/time/_slot/TimeChartSlot';
import FuturesSlot from '@/app/(auth)/time/_slot/FuturesSlot';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <TimeTemplate
      activitySlot={
        <Suspense
          fallback={Array.from({ length: 30 }).map((_, index) => (
            <p key={index} className={`cursor-pointer size-full rounded-lg bg-gray-400`} />
          ))}
        >
          <ActivitySlot />
        </Suspense>
      }
      timeChartSlot={
        <Suspense>
          <TimeChartSlot />
        </Suspense>
      }
      futuresSlot={
        <Suspense>
          <FuturesSlot />
        </Suspense>
      }
    />
  );
}
