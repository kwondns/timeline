import TimeChart from '@/organisms/TimeChart';
import { getPasts } from '@/app/(auth)/time/_api/getPasts';
import { getTokenAndUserId } from '@/lib/dal/auth';

export default async function TimeChartSlot() {
  const { userId, token } = await getTokenAndUserId();
  const pasts = await getPasts(userId, token);

  return <TimeChart pasts={pasts} />;
}
