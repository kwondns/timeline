import { calculateDateDiff } from '@/lib/date';
import PresentTimeClient from '@/molecules/PresentTimeClient';

type PresentTimeProps = {
  startTime: string;
};
export default function PresentTime(props: PresentTimeProps) {
  const { startTime } = props;

  const diff = calculateDateDiff(startTime ?? '', new Date());
  if (startTime) return <PresentTimeClient startTime={startTime} initialDiff={diff} />;
  return <div />;
}
