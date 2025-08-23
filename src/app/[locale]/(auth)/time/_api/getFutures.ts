import { TimeFutureType } from '@/types/time.type';
import { callGetWithAuth } from '@/lib/dal/http';

export async function getFutures(): Promise<TimeFutureType[]> {
  return await callGetWithAuth<TimeFutureType[]>('/future/analysis', {
    next: { revalidate: false },
    tag: 'time-future',
  });
}
