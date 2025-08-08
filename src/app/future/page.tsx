import FutureTemplate from '@/templates/Future.template';
import { FutureBoxCardProps } from '@/organisms/FutureBoxCard';

export default async function Page() {
  const result = await fetch(`${process.env.API_SERVER_URL}/future`, { method: 'GET' });
  const futureBoxes = (await result.json()) as FutureBoxCardProps[];
  return <FutureTemplate futureBoxes={futureBoxes} />;
}
