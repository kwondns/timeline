import TimeTemplate from '@/templates/Time.template';
import { TimeFutureType, TimePastType } from '@/types/time.type';
import { callGetWithAuth } from '@/lib/dal/http';

async function getPasts(): Promise<TimePastType[]> {
  return await callGetWithAuth<TimePastType[]>('/past/count');
}

async function getFutures(): Promise<TimeFutureType[]> {
  return await callGetWithAuth<TimeFutureType[]>('/future/analysis');
}

export default async function Page() {
  const pastsData = getPasts();
  const futuresData = getFutures();
  const [pasts, futures] = await Promise.all([pastsData, futuresData]);
  return <TimeTemplate pasts={pasts} futures={futures} />;
}
