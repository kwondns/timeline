import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { GetFetch, PostFetch } from '@/libs/fetch.lib';
import { PastCountType } from '@/types/PastCount.type';
import { PastCreateType, PastType } from '@/types/Past.type';

export function usePast(date: string) {
  return {
    queryKey: ['past', date],
    queryFn: async () => GetFetch<PastType[]>(`/past/${date}`),
  };
}

export function usePastCreate() {
  const queryClient = useQueryClient();
  const { mutate: createPast, isPending: isCreating } = useMutation({
    mutationFn: (payload: PastCreateType) => PostFetch<PastCreateType, PastType>('/past', payload),
    onMutate: () => {
      toast('과거를 쓰는 중입니다...', { autoClose: false, toastId: 'past' });
    },
    onSuccess: (_, variables) => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['past', new Date().toLocaleDateString()] }),
        queryClient.invalidateQueries({ queryKey: ['past', 'count'] }),
        queryClient.invalidateQueries({ queryKey: ['present'] }),
      ]).then(async () => {
        toast.update('past', { render: '과거에 담았습니다.', autoClose: 1500, type: 'success' });
        const cleanLength = await GetFetch(`/past/cleanup/${variables.startTime}`);
        if (cleanLength)
          toast.update('past', { render: `${cleanLength}개 스토리지 청소완료!`, type: 'success', autoClose: 1500 });
      });
    },
    onError: () => {
      toast.update('past', { render: '과거를 담는데 실패했습니다.', autoClose: 3000, type: 'error' });
    },
  });
  return { createPast, isCreating };
}
export const usePastCalendar = (date: Date) => ({
  queryKey: ['past', 'calendar', date],
  queryFn: async () => GetFetch<PastCountType[]>(`/past/calendar/${date}`),
});
export const usePastCountAll = () => ({
  queryKey: ['past', 'count'],
  queryFn: async () => GetFetch<PastCountType[]>('/past/count'),
});
