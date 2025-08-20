import PresentTime from '@/molecules/PresentTime';

export default function PresentTimeSlot({ startTime }: { startTime: string }) {
  return <PresentTime startTime={startTime} />;
}
