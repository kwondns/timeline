import TimeTemplate from '@/templates/Time.template';
import ActivitySlot from '@/app/[locale]/(auth)/time/_slot/ActivitySlot';
import TimeChartSlot from '@/app/[locale]/(auth)/time/_slot/TimeChartSlot';
import FuturesSlot from '@/app/[locale]/(auth)/time/_slot/FuturesSlot';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { TIME_METADATA } from '@/constants/METADATA';
import { Metadata } from 'next';
import { Locale } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: TIME_METADATA.title[locale],
    description: TIME_METADATA.description[locale],
  };
}

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
        <Suspense fallback={<Skeleton className="self-center m-auto h-[230px] mt-[50px] w-[350px] rounded-2xl" />}>
          <TimeChartSlot />
        </Suspense>
      }
      futuresSlot={
        <Suspense fallback={<Skeleton className="h-[200px] w-full rounded-xl" />}>
          <FuturesSlot />
        </Suspense>
      }
    />
  );
}
