'use client';

import { Legend } from 'recharts';
import TimeChartTooltipClient from '@/molecules/TimeChartTooltip.client';
import { MouseHandlerDataParam } from 'recharts/types/synchronisation/types';
import { createPastLink } from '@/lib/utils/date';
import { useRouter } from '@/i18n/navigation';
import { TimePastType } from '@/types/time.type';
import dynamic from 'next/dynamic';

type TimeChartProps = {
  pasts: TimePastType[];
};
const ResponsiveContainer = dynamic(() => import('recharts').then((mod) => mod.ResponsiveContainer), { ssr: false });
const ComposedChart = dynamic(() => import('recharts').then((mod) => mod.ComposedChart), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then((mod) => mod.CartesianGrid), { ssr: false });
const Bar = dynamic(() => import('recharts').then((mod) => mod.Bar), { ssr: false });
const Line = dynamic(() => import('recharts').then((mod) => mod.Line), { ssr: false });
const XAxis = dynamic(() => import('recharts').then((mod) => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then((mod) => mod.YAxis), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then((mod) => mod.Tooltip), { ssr: false });
export default function TimeChartClient(props: TimeChartProps) {
  const { pasts } = props;
  const route = useRouter();

  if (!pasts) return <span>Error!</span>;
  const onClickChart = (event: MouseHandlerDataParam) => {
    const { activeTooltipIndex } = event;
    if (pasts[Number(activeTooltipIndex)].date && activeTooltipIndex) {
      route.push(createPastLink(pasts[Number(activeTooltipIndex)].date));
    }
  };
  return (
    <ResponsiveContainer>
      <ComposedChart
        className="select-none"
        data={pasts}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
        onClick={onClickChart}
      >
        <CartesianGrid stroke="#303030" />
        <XAxis dataKey="date" />
        <YAxis orient="left" yAxisId={1} domain={['dataMin + 1', 'auto']} />
        <YAxis orientation="right" yAxisId={2} domain={[0, 'dataMax + 2']} />
        <Tooltip content={<TimeChartTooltipClient />} />
        <Legend />
        <Bar name="Counts" dataKey="titles_count" yAxisId={2} barSize={10} fill="#bb6667" />
        <Line
          name="Times"
          type="monotone"
          dataKey="count"
          yAxisId={1}
          activeDot={{ r: 8 }}
          stroke="#82ca9d"
          dot={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
