import TimeChart from '@/organisms/TimeChart';
import { getPasts } from '@/app/[locale]/(auth)/time/_api/getPasts';

export default async function TimeChartSlot() {
  const pasts = await getPasts();

  return <TimeChart pasts={pasts} />;
}
