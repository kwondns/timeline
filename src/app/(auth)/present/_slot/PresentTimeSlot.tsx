'use client';

import PresentTime from '@/molecules/PresentTime';
import { usePresentActions } from '@/templates/PresentClient.template';

export default function PresentTimeSlot() {
  const { startTime } = usePresentActions();
  return <PresentTime startTime={startTime ?? ''} />;
}
