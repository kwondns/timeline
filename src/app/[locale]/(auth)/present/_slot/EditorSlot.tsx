import EditorClient from '@/molecules/Editor.client';

export default function EditorSlot({ startTime }: { startTime: string }) {
  return <EditorClient startTimeString={startTime} />;
}
