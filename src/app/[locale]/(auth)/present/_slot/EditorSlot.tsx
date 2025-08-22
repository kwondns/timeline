import Editor from '@/molecules/Editor';

export default function EditorSlot({ startTime }: { startTime: string }) {
  return <Editor startTimeString={startTime} />;
}
