import TimeFutureProgress from '@/organisms/TimeFutureProgress';
import { getFutures } from '@/app/(auth)/time/_api/getFutures';
import NoFutureBoxTemplate from '@/templates/NoFutureBox.template';
import { getTokenAndUserId } from '@/lib/auth/token';

export default async function FuturesSlot() {
  const { userId, token } = await getTokenAndUserId();
  const futures = await getFutures(userId, token);

  if (futures.length > 0) return futures.map((future) => <TimeFutureProgress key={future.id} futureBox={future} />);
  return <NoFutureBoxTemplate />;
}
