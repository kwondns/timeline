import { TimeFutureType } from '@/types/time.type';
import { callGetWithAuth } from '@/lib/dal/http';

export async function getFutures(userId: string, token: string): Promise<TimeFutureType[]> {
  return await callGetWithAuth<TimeFutureType[]>('/future/analysis', {
    next: { revalidate: false, tags: [`time-future-${userId}`] },
    userId,
    token,
  });
}
