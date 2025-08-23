import { PastListType } from '@/types/past.type';
import CalendarContent from '@/organisms/CalendarContent';
import { callGetWithAuth } from '@/lib/dal/http';
import { Suspense } from 'react';

export default async function Page({ params }: { params: Promise<{ current: string }> }) {
  const { current: currentString } = await params;

  const thisMonthString = new Date().toISOString().slice(0, 7);

  const pasts = await callGetWithAuth<PastListType[]>(`/past/calendar/${currentString}`, {
    next: {
      revalidate: thisMonthString === currentString ? 3600 : false,
    },
    tag: `calendar-${currentString}`,
  });

  return (
    <Suspense>
      <CalendarContent pasts={pasts} />
    </Suspense>
  );
}
