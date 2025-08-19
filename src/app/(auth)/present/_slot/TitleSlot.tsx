'use client';

import PresentInputOrDisplay from '@/molecules/PresentInputOrDisplay';
import { usePresentActions } from '@/templates/PresentClient.template';

export default function TitleSlot() {
  const { title } = usePresentActions();
  return <PresentInputOrDisplay title={title} />;
}
