'use client';

import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import TimeChartTooltip from '@/molecules/TimeChartTooltip';
import { MouseHandlerDataParam } from 'recharts/types/synchronisation/types';
import { createPastLink } from '@/lib/date';
import { useRouter } from 'next/navigation';
import { TimePastType } from '@/types/time.type';

type TimeChartProps = {
  pasts: TimePastType[];
};
export default function TimeChart(props: TimeChartProps) {
  const { pasts } = props;
  const route = useRouter();

  if (!pasts) return <span>Error!</span>;
  const onClickChart = (event: MouseHandlerDataParam) => {
    const { activeTooltipIndex } = event;
    if (activeTooltipIndex) {
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
        <Tooltip content={<TimeChartTooltip />} />
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
