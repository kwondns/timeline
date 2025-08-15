import { TimePastType } from '@/types/time.type';
import { callGetWithAuth } from '@/lib/dal/http';

export async function getPasts(userId: string): Promise<TimePastType[]> {
  return await callGetWithAuth<TimePastType[]>('/past/count', {
    next: { revalidate: false, tags: [`time-past-${userId}`] },
  });
}
