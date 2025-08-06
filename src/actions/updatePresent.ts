'use server';

import { callFetch } from '@/lib/fetch';
import { revalidatePath } from 'next/cache';

export const updatePresentTitleAction = async (title: string) => {
  await callFetch('/present', { title }, { method: 'PATCH' });

  revalidatePath('/present');
};

export const updatePresentStartAction = async () => {
  await callFetch('/present', { startTime: new Date().toISOString() }, { method: 'PATCH' });

  revalidatePath('/present');
};
