import TimeChart from '@/organisms/TimeChart';
import { headers } from 'next/headers';
import { getPasts } from '@/app/(auth)/time/_api/getPasts';

export default async function TimeChartSlot() {
  const userId = (await headers()).get('x-user-id') as string;
  const pasts = await getPasts(userId);

  return <TimeChart pasts={pasts} />;
}
