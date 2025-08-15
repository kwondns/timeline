'use server';

import { callFetch, withAuth } from '@/lib/dal/http';
import { z } from 'zod';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';

type AddFutureType = {
  title: string;
  type: 'check' | 'progress';
};

const AddFutureBoxActionSchema = z.object({
  title: z.string(),
  type: z.enum(['check', 'progress']),
});

export const addFutureBoxAction = withAuth(async (_: any, formData: FormData) => {
  const userId = (await headers()).get('x-user-id');
  const title = formData.get('title');
  const type = formData.get('type');
  const validatedData = AddFutureBoxActionSchema.parse({ title, type });

  try {
    await callFetch<AddFutureType>('/future/box', validatedData, { method: 'POST', expectNoContent: true, auth: true });
    revalidateTag(`future-${userId}`);
    revalidateTag(`time-future-${userId}`);
    return true;
  } catch (e) {
    return false;
  }
});
