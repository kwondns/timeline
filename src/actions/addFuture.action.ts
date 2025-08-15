'use server';

import { callFetch, withAuth } from '@/lib/dal/http';
import { z } from 'zod';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';

type AddFutureType = {
  content: string;
  boxId: string;
  priority?: number;
};

const AddFutureActionSchema = z.object({
  content: z.string(),
  boxId: z.string(),
  priority: z.number().optional(),
});

export const addFutureAction = withAuth(async (_: any, formData: FormData) => {
  const userId = (await headers()).get('x-user-id');
  const content = formData.get('content');
  const boxId = formData.get('boxId');
  const priority = formData.get('priority');
  const validatedData = AddFutureActionSchema.parse({ content, boxId, priority: Number(priority) });

  try {
    await callFetch<AddFutureType>('/future', validatedData, { method: 'POST', expectNoContent: true, auth: true });
    revalidateTag(`future-${userId}`);
    revalidateTag(`time-future-${userId}`);
    return true;
  } catch (e) {
    return false;
  }
});
