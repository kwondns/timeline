'use server';

import { callFetch, withAuth } from '@/lib/dal/http';

type ToggleCheckBoxType = {
  category: 'future' | 'box';
  checked: boolean;
  id: string;
};

export const toggleCheckBoxAction = withAuth(async (payload: ToggleCheckBoxType) => {
  const { category, checked, id } = payload;
  const url = category === 'box' ? '/future/box' : '/future';
  await callFetch<Omit<ToggleCheckBoxType, 'category'>>(
    url,
    { id, checked },
    { method: 'PATCH', expectNoContent: true, auth: true },
  );
});
