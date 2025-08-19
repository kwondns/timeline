'use server';

import { callFetchForAction, withTokenValidation } from '@/lib/dal/http';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';

type ToggleCheckBoxType = {
  category: 'future' | 'box';
  checked: boolean;
  id: string;
};

export const toggleCheckBoxAction = withTokenValidation(async (payload: ToggleCheckBoxType) => {
  const { category, checked, id } = payload;
  const userId = (await headers()).get('x-user-id');
  const url = category === 'box' ? '/future/box' : '/future';
  await callFetchForAction<Omit<ToggleCheckBoxType, 'category'>>(
    url,
    { id, checked },
    { method: 'PATCH', expectNoContent: true, auth: true },
  );
  revalidateTag(`future-${userId}`);
  revalidateTag(`time-future-${userId}`);
});
