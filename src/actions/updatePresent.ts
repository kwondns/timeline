'use server';

import { callFetch, fileUpload, withAuth } from '@/lib/dal/http';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';

export const updatePresentTitleAction = withAuth(async (title: string) => {
  const userId = (await headers()).get('x-user-id');
  await callFetch('/present', { title }, { method: 'PATCH', auth: true });

  revalidateTag(`present-${userId}`);
});

export const updatePresentStartAction = withAuth(async () => {
  const userId = (await headers()).get('x-user-id');
  await callFetch('/present', { startTime: new Date().toISOString() }, { method: 'PATCH', auth: true });

  revalidateTag(`present-${userId}`);
});

export const updatePresentContentAction = withAuth(async (content: string) => {
  const userId = (await headers()).get('x-user-id');
  await callFetch('/present', { content }, { method: 'PATCH', auth: true });
  revalidateTag(`present-${userId}`);
});

type UpdatePresentEndActionType = {
  startTime: string;
  endTime: string;
  content: string;
  title: string;
};
export const updatePresentEndAction = withAuth(async (payload: UpdatePresentEndActionType) => {
  const userId = (await headers()).get('x-user-id');
  const { startTime } = payload;
  await callFetch('/past', payload, { method: 'POST', auth: true });

  const startTimeKSTDate = new Date(new Date(startTime).getTime() + 9 * 60 * 60 * 1000);
  const revalidateCalendarTag = `calendar-${userId}-${startTimeKSTDate.toISOString().slice(0, 7)}`;
  const revalidatePastTag = `past-${userId}-${startTimeKSTDate.toISOString().slice(0, 10)}`;

  revalidateTag(`present-${userId}`);
  revalidateTag(`time-past-${userId}`);
  revalidateTag(revalidateCalendarTag);
  revalidateTag(revalidatePastTag);
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
