'use server';

import { callFetch, withAuth } from '@/lib/dal/http';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';

type SavePercentageActionType = {
  id: string;
  percentage: number;
};
export const savePercentageAction = withAuth(async (payload: SavePercentageActionType) => {
  const userId = (await headers()).get('x-user-id');
  try {
    await callFetch('/future', payload, { method: 'PATCH', auth: true });
    revalidateTag(`future-${userId}`);
    revalidateTag(`time-future-${userId}`);
  } catch (e) {
    throw new Error('에러가 발생했습니다.');
  }
});
