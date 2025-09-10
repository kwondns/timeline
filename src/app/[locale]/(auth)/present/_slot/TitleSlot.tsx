import PresentInputOrDisplayClient from '@/molecules/PresentInputOrDisplay.client';

export default function TitleSlot({ title }: { title: string }) {
  return <PresentInputOrDisplayClient title={title} />;
}
