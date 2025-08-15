import TimeFutureProgress from '@/organisms/TimeFutureProgress';
import { headers } from 'next/headers';
import { getFutures } from '@/app/(auth)/time/_api/getFutures';
import NoFutureBox from '@/templates/NoFutureBox';

export default async function FuturesSlot() {
  const userId = (await headers()).get('x-user-id') as string;
  const futures = await getFutures(userId);

  if (futures.length > 0) futures.map((future) => <TimeFutureProgress key={future.id} futureBox={future} />);
  return <NoFutureBox />;
}
