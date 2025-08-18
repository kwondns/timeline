import { PastListType } from '@/types/past.type';
import CalendarContent from '@/organisms/CalendarContent';
import { callGetWithAuth } from '@/lib/dal/http';
import { Suspense } from 'react';
import { getTokenAndUserId } from '@/lib/auth/token';

export default async function Page({ params }: { params: Promise<{ current: string }> }) {
  const { current: currentString } = await params;
  const { userId, token } = await getTokenAndUserId();

  const thisMonthString = new Date().toISOString().slice(0, 7);

  const pasts = await callGetWithAuth<PastListType[]>(`/past/calendar/${currentString}`, {
    headers: { 'x-user-id': userId },
    next: {
      revalidate: thisMonthString === currentString ? 3600 : false,
      tags: [`calendar-${userId}-${currentString}`],
    },
    userId,
    token,
  });

  return (
    <Suspense>
      <CalendarContent pasts={pasts} />
    </Suspense>
  );
}
