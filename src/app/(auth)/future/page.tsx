import FutureBoxCard, { FutureBoxCardProps } from '@/organisms/FutureBoxCard';
import { callGetWithAuth } from '@/lib/dal/http';
import { headers } from 'next/headers';
import Typography from '@/atoms/Typography';
import { Card } from '@/components/ui/card';

export default async function Page() {
  const userId = (await headers()).get('x-user-id') as string;
  const futureBoxes = await callGetWithAuth<FutureBoxCardProps[]>('/future', {
    next: { revalidate: false, tags: [`future-${userId}`] },
  });
  return futureBoxes.length > 0 ? (
    futureBoxes.map((futureBox) => <FutureBoxCard key={futureBox.id} {...futureBox} />)
  ) : (
    <Card className="p-6 max-h-[450px]">
      <Typography.span>계획을 추가 해주세요!</Typography.span>
    </Card>
  );
}
