import FutureBoxCard, { FutureBoxCardProps } from '@/organisms/FutureBoxCard';
import { callGetWithAuth } from '@/lib/dal/http';
import NoFutureBoxTemplate from '@/templates/NoFutureBox.template';
import { getTokenAndUserId } from '@/lib/dal/auth';

export default async function Page() {
  const { userId, token } = await getTokenAndUserId();
  const futureBoxes = await callGetWithAuth<FutureBoxCardProps[]>('/future', {
    next: { revalidate: false, tags: [`future-${userId}`] },
    userId,
    token,
  });
  return futureBoxes.length > 0 ? (
    futureBoxes.map((futureBox) => <FutureBoxCard key={futureBox.id} {...futureBox} />)
  ) : (
    <NoFutureBoxTemplate />
  );
}
