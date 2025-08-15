import FutureBoxCard, { FutureBoxCardProps } from '@/organisms/FutureBoxCard';
import { callGetWithAuth } from '@/lib/dal/http';
import { headers } from 'next/headers';
import NoFutureBoxTemplate from '@/templates/NoFutureBox.template';

export default async function Page() {
  const userId = (await headers()).get('x-user-id') as string;
  const futureBoxes = await callGetWithAuth<FutureBoxCardProps[]>('/future', {
    next: { revalidate: false, tags: [`future-${userId}`] },
  });
  return futureBoxes.length > 0 ? (
    futureBoxes.map((futureBox) => <FutureBoxCard key={futureBox.id} {...futureBox} />)
  ) : (
    <NoFutureBoxTemplate />
  );
}
