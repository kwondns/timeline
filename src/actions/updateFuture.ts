'use server';

import { callFetch, withAuth } from '@/lib/dal/http';
import { revalidatePath } from 'next/cache';

type UpdateFutureActionType = {
  id: string;
  category: 'future' | 'box';
  value: string;
};
export const updateFutureAction = withAuth(async (payload: UpdateFutureActionType) => {
  const { category, id, value } = payload;
  const url = category === 'box' ? '/future/box' : '/future';
  const body = { id };
  if (category === 'box') Object.assign(body, { title: value });
  else Object.assign(body, { content: value });
  await callFetch(url, body, { method: 'PATCH', auth: true });
  revalidatePath('/future');
});
