import FutureBoxCard, { FutureBoxCardProps } from '@/organisms/FutureBoxCard';
import { callGetWithAuth } from '@/lib/dal/http';
import NoFutureBoxTemplate from '@/templates/NoFutureBox.template';

export default async function Page() {
  const futureBoxes = await callGetWithAuth<FutureBoxCardProps[]>('/future', {
    next: { revalidate: false },
    tag: 'future',
  });
  return futureBoxes.length > 0 ? (
    futureBoxes.map((futureBox) => <FutureBoxCard key={futureBox.id} {...futureBox} />)
  ) : (
    <NoFutureBoxTemplate />
  );
}
