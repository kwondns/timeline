import ActionButtonGroup from '@/molecules/ActionButtonGroup';

export default function ActionButtonSlot({ startTime }: { startTime: string }) {
  return <ActionButtonGroup isStarted={!!startTime} />;
}
