'use server';

import { callFetchForAction, fileUpload, withTokenValidation } from '@/lib/dal/http';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';

export const updatePresentTitleAction = withTokenValidation(async (title: string) => {
  const userId = (await headers()).get('x-user-id');
  await callFetchForAction('/present', { title }, { method: 'PATCH', auth: true });

  revalidateTag(`present-${userId}`);
});

export const updatePresentStartAction = withTokenValidation(async () => {
  const userId = (await headers()).get('x-user-id');
  await callFetchForAction('/present', { startTime: new Date().toISOString() }, { method: 'PATCH', auth: true });

  revalidateTag(`present-${userId}`);
});

export const updatePresentContentAction = withTokenValidation(async (content: string) => {
  const userId = (await headers()).get('x-user-id');
  await callFetchForAction('/present', { content }, { method: 'PATCH', auth: true });
  revalidateTag(`present-${userId}`);
});

type UpdatePresentEndActionType = {
  startTime: string;
  endTime: string;
  content: string;
  title: string;
};
export const updatePresentEndAction = withTokenValidation(async (payload: UpdatePresentEndActionType) => {
  const userId = (await headers()).get('x-user-id');
  const { startTime } = payload;
  await callFetchForAction('/past', payload, { method: 'POST', auth: true });

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

export const uploadImageAction = withTokenValidation(async (payload: UploadImageActionType) => {
  const { file, uri, num } = payload;
  return await fileUpload(file, uri, num);
});
