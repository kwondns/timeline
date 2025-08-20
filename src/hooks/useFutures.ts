import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { GetFetch, PatchFetch, PostFetch } from '@/libs/fetch.lib';
import {
  FutureBoxCreateType,
  FutureBoxType,
  FutureBoxUpdateType,
  FutureCreateType,
  FutureType,
  FutureUpdateType,
} from '@/types/Future.type';

export const useGetFutureHigh = (record = false) => ({
  queryKey: ['future', 'high', record],
  queryFn: async () => GetFetch<FutureBoxType[]>(`/future/1${record ? '/record' : ''}`),
});
export const useGetFutureMiddle = (record = false) => ({
  queryKey: ['future', 'middle', record],
  queryFn: async () => GetFetch<FutureBoxType[]>(`/future/2${record ? '/record' : ''}`),
});
export const useGetFutureLow = (record = false) => ({
  queryKey: ['future', 'low', record],
  queryFn: async () => GetFetch<FutureBoxType[]>(`/future/3${record ? '/record' : ''}`),
});

const priority = (queryClient: QueryClient) => ({
  1: () => queryClient.invalidateQueries({ queryKey: ['future', 'high', false] }),
  2: () => queryClient.invalidateQueries({ queryKey: ['future', 'middle', false] }),
  3: () => queryClient.invalidateQueries({ queryKey: ['future', 'low', false] }),
});

export const useCreateFuture = () => {
  const queryClient = useQueryClient();

  const { mutate: createFuture, isPending: isCreating } = useMutation({
    mutationFn: async (payload: FutureCreateType) => {
      const { priority, ...exceptPriorityPayload } = payload;
      await PostFetch<Omit<FutureCreateType, 'priority'>, FutureType>('/future', exceptPriorityPayload);
    },
    onMutate: () => {
      toast('미래를 만드는 중...', { autoClose: false, toastId: 'futureCreate' });
    },
    onSuccess: (_, variables) => {
      priority(queryClient)[variables.priority]();
      toast.update('futureCreate', { render: '미래를 만들었습니다.', autoClose: 1500, type: 'success' });
    },
    onError: async (error) => {
      toast.update('futureCreate', { render: error.message, autoClose: 3000, type: 'error' });
    },
  });
  return { createFuture, isCreating };
};

export const useUpdateFuture = () => {
  const queryClient = useQueryClient();

  const { mutate: updateFuture, isPending: isUpdating } = useMutation({
    mutationFn: async (payload: FutureUpdateType) => {
      const { priority, ...exceptPriorityPayload } = payload;
      await PatchFetch<Omit<FutureUpdateType, 'priority'>, FutureType>('/future', exceptPriorityPayload);
    },
    onMutate: () => {
      toast('미래를 바꾸는 중...', { autoClose: false, toastId: 'futureUpdate' });
    },
    onSuccess: (_, variables) => {
      priority(queryClient)[variables.priority]();
      toast.update('futureUpdate', { render: '미래를 변경했습니다.', autoClose: 1500, type: 'success' });
    },
    onError: async (error) => {
      toast.update('futureUpdate', { render: error.message, autoClose: 3000, type: 'error' });
    },
  });
  return { updateFuture, isUpdating };
};

export const useCreateFutureBox = () => {
  const queryClient = useQueryClient();

  const { mutate: createFutureBox, isPending: isCreating } = useMutation({
    mutationFn: async (payload: FutureBoxCreateType) => {
      await PostFetch<FutureBoxCreateType, FutureBoxType>('/future/box', payload);
    },
    onMutate: () => {
      toast('미래상자를 만드는 중...', { autoClose: false, toastId: 'futureBoxCreate' });
    },
    onSuccess: (_, variables) => {
      priority(queryClient)[variables.priority]();
      toast.update('futureBoxCreate', { render: '미래상자를 만들었습니다.', autoClose: 1500, type: 'success' });
    },
    onError: async (error) => {
      toast.update('futureBoxCreate', { render: error.message, autoClose: 3000, type: 'error' });
    },
  });
  return { createFutureBox, isCreating };
};
export const useUpdateFutureBox = () => {
  const queryClient = useQueryClient();

  const { mutate: updateFutureBox, isPending: isUpdating } = useMutation({
    mutationFn: async (payload: FutureBoxUpdateType) => {
      await PatchFetch<FutureBoxUpdateType, FutureBoxType>('/future/box', payload);
    },
    onMutate: () => {
      toast('미래상자를 바꾸는 중...', { autoClose: false, toastId: 'futureUpdate' });
    },
    onSuccess: (_, variables) => {
      priority(queryClient)[variables.priority]();
      toast.update('futureUpdate', { render: '미래상자를 변경했습니다.', autoClose: 1500, type: 'success' });
    },
    onError: async (error) => {
      toast.update('futureUpdate', { render: error.message, autoClose: 3000, type: 'error' });
    },
  });
  return { updateFutureBox, isUpdating };
};

export const useSwapFutureBox = () => {
  const queryClient = useQueryClient();

  const { mutate: swapFutureBox } = useMutation({
    mutationFn: async (payload: [FutureBoxType, FutureBoxType]) => {
      const [active, over] = payload;
      const activePayload = { id: active.id, order: over.order, priority: active.priority };
      const overPayload = { id: over.id, order: active.order, priority: over.priority };
      await Promise.all([
        PatchFetch<FutureBoxUpdateType, FutureBoxType>('/future/box', activePayload),
        PatchFetch<FutureBoxUpdateType, FutureBoxType>('/future/box', overPayload),
      ]);
    },
    onMutate: () => {
      toast('미래상자를 바꾸는 중...', { autoClose: false, toastId: 'futureUpdate' });
    },
    onSuccess: (_, variables) => {
      if (variables[0].priority !== variables[1].priority) {
        priority(queryClient)[variables[0].priority]();
        priority(queryClient)[variables[1].priority]();
      } else priority(queryClient)[variables[0].priority]();
      toast.update('futureUpdate', { render: '미래상자를 변경했습니다.', autoClose: 1500, type: 'success' });
    },
    onError: async (error) => {
      toast.update('futureUpdate', { render: error.message, autoClose: 3000, type: 'error' });
    },
  });
  return { swapFutureBox };
};
