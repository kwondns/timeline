import FutureTemplate from '@/templates/Future.template';
import { FutureBoxCardProps } from '@/organisms/FutureBoxCard';

async function getFutureBoxes(): Promise<FutureBoxCardProps[]> {
  const result = await fetch(`${process.env.API_SERVER_URL}/future`, { method: 'GET' });
  return await result.json();
}

export default async function Page() {
  const futureBoxes = await getFutureBoxes();
  return <FutureTemplate futureBoxes={futureBoxes} />;
}
