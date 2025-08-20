'use client';

import Editor from '@/molecules/Editor';
import { usePresentActions } from '@/templates/PresentClient.template';

export default function EditorSlot() {
  const { startTime } = usePresentActions();
  return <Editor startTimeString={startTime ?? ''} />;
}
