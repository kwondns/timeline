import TimeFutureProgress from '@/organisms/TimeFutureProgress';
import { getFutures } from '@/app/[locale]/(auth)/time/_api/getFutures';
import NoFutureBoxTemplate from '@/templates/NoFutureBox.template';

export default async function FuturesSlot() {
  const futures = await getFutures();

  if (futures.length > 0) return futures.map((future) => <TimeFutureProgress key={future.id} futureBox={future} />);
  return <NoFutureBoxTemplate />;
}
