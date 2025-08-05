'use server';

import { callFetch } from '@/lib/fetch';
import { z } from 'zod';

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

export const addFutureAction = async (formData: FormData) => {
  const content = formData.get('content');
  const boxId = formData.get('boxId');
  const priority = formData.get('priority');
  const validatedData = AddFutureActionSchema.parse({ content, boxId, priority: Number(priority) });

  await callFetch<AddFutureType>('/future', validatedData, { method: 'POST' });
};
