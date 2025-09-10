import TimeChartClient from '@/organisms/TimeChart.client';
import { getPasts } from '@/app/[locale]/(auth)/time/_api/getPasts';

export default async function TimeChartSlot() {
  const pasts = await getPasts();

  return <TimeChartClient pasts={pasts} />;
}
