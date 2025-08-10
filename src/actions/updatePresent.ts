'use server';

import { callFetch, fileUpload, withAuth } from '@/lib/fetch';
import { revalidatePath } from 'next/cache';

export const updatePresentTitleAction = withAuth(async (title: string) => {
  await callFetch('/present', { title }, { method: 'PATCH' });

  revalidatePath('/present');
});

export const updatePresentStartAction = withAuth(async () => {
  await callFetch('/present', { startTime: new Date().toISOString() }, { method: 'PATCH' });

  revalidatePath('/present');
});

export const updatePresentContentAction = withAuth(async (content: string) => {
  await callFetch('/present', { content }, { method: 'PATCH' });
});

type UpdatePresentEndActionType = {
  startTime: string;
  endTime: string;
  content: string;
  title: string;
};
export const updatePresentEndAction = withAuth(async (payload: UpdatePresentEndActionType) => {
  await callFetch('/past', payload, { method: 'POST' });
  revalidatePath('/present');
});

export const cleanUpImageAction = async (startTime: string) => {
  const result = await fetch(`${process.env.API_SERVER_URL}/past/cleanup/${startTime}`);
  return result.json();
};

type UploadImageActionType = {
  file: File;
  uri: string;
  num: number;
};

export const uploadImageAction = withAuth(async (payload: UploadImageActionType) => {
  const { file, uri, num } = payload;
  return await fileUpload(file, uri, num);
});
