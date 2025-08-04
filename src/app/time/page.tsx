import TimeTemplate from '@/templates/Time.template';
import { TimeFutureType, TimePastType } from '@/types/time.type';

async function getPasts(): Promise<TimePastType[]> {
  const result = await fetch(`${process.env.API_SERVER_URL}/past/count`, { method: 'GET' });
  return await result.json();
}

async function getFutures(): Promise<TimeFutureType[]> {
  const result = await fetch(`${process.env.API_SERVER_URL}/future/analysis`, { method: 'GET' });
  return await result.json();
}

export default async function Page() {
  const pastsData = getPasts();
  const futuresData = getFutures();
  const [pasts, futures] = await Promise.all([pastsData, futuresData]);
  return <TimeTemplate pasts={pasts} futures={futures} />;
}
