import ActionButtonGroupClient from '@/molecules/ActionButtonGroup.client';

export default function ActionButtonSlot({ startTime }: { startTime: string }) {
  return <ActionButtonGroupClient isStarted={!!startTime} />;
}
