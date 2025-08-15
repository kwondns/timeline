'use server';

import { callFetch, withAuth } from '@/lib/dal/http';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';

type ToggleCheckBoxType = {
  category: 'future' | 'box';
  checked: boolean;
  id: string;
};

export const toggleCheckBoxAction = withAuth(async (payload: ToggleCheckBoxType) => {
  const { category, checked, id } = payload;
  const userId = (await headers()).get('x-user-id');
  const url = category === 'box' ? '/future/box' : '/future';
  await callFetch<Omit<ToggleCheckBoxType, 'category'>>(
    url,
    { id, checked },
    { method: 'PATCH', expectNoContent: true, auth: true },
  );
  revalidateTag(`future-${userId}`);
  revalidateTag(`time-future-${userId}`);
});
