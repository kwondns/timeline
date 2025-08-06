'use server';

import { callFetch } from '@/lib/fetch';

type SavePercentageActionType = {
  id: string;
  percentage: number;
};
export const savePercentageAction = async (payload: SavePercentageActionType) => {
  try {
    await callFetch('/future', payload, { method: 'PATCH' });
  } catch (e) {
    throw new Error('에러가 발생했습니다.');
  }
};
