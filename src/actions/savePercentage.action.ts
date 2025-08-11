'use server';

import { callFetch, withAuth } from '@/lib/dal/http';

type SavePercentageActionType = {
  id: string;
  percentage: number;
};
export const savePercentageAction = withAuth(async (payload: SavePercentageActionType) => {
  try {
    await callFetch('/future', payload, { method: 'PATCH' });
  } catch (e) {
    throw new Error('에러가 발생했습니다.');
  }
});
