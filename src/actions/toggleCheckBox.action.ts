'use server';

import { callFetch } from '@/lib/fetch';

type ToggleCheckBoxType = {
  category: 'future' | 'box';
  checked: boolean;
  id: string;
};

export const toggleCheckBoxAction = async (payload: ToggleCheckBoxType) => {
  const { category, checked, id } = payload;
  const url = category === 'box' ? '/future/box' : '/future';
  await callFetch<Omit<ToggleCheckBoxType, 'category'>>(url, { id, checked }, { method: 'PATCH' });
};
