'use client';

import ActionButtonGroup from '@/molecules/ActionButtonGroup';
import { usePresentActions } from '@/templates/PresentClient.template';

export default function ActionButtonSlot() {
  const { startTime } = usePresentActions();
  return <ActionButtonGroup isStarted={!!startTime} />;
}
