'use server';

import { callFetchForAction, withTokenValidation } from '@/lib/dal/http';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';

type UpdateFutureActionType = {
  id: string;
  category: 'future' | 'box';
  value: string;
};
export const updateFutureAction = withTokenValidation(async (payload: UpdateFutureActionType) => {
  const { category, id, value } = payload;
  const userId = (await headers()).get('x-user-id');
  const url = category === 'box' ? '/future/box' : '/future';
  const body = { id };
  if (category === 'box') Object.assign(body, { title: value });
  else Object.assign(body, { content: value });
  await callFetchForAction(url, body, { method: 'PATCH', auth: true });
  revalidateTag(`future-${userId}`);
  revalidateTag(`time-future-${userId}`);
});
