import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { io } from 'socket.io-client';

import { PresentType } from '@/types/Present.type';
import { EndTimeAtom, MarkdownAtom, StartTimeAtom, TitleAtom } from '@/stores/Present.store';
import { GetFetch, PutFetch } from '@/libs/fetch.lib';

export const useGetPresent = () => ({
  queryKey: ['present'],
  queryFn: async () => GetFetch<PresentType>('/present'),
});

export const useUpdatePresent = () => {
  const { mutate: updatePresent, isPending: isUpdating } = useMutation({
    mutationFn: async (payload: PresentType) => {
      if (!payload.startTime) delete payload.startTime;
      if (!payload.endTime) delete payload.endTime;
      if (!payload.title) delete payload.title;
      if (!payload.content) delete payload.content;
      return PutFetch<PresentType, PresentType>(`/present`, payload);
    },
    onMutate: () => {
      toast('현재 수정중...', { autoClose: false, toastId: 'present' });
    },
    onError: async (error) => {
      toast.update('present', { render: error.message, autoClose: 3000, type: 'error' });
    },
    onSuccess: async (_, variables) => {
      let render: string;
      if (variables.startTime) render = '시작 완료';
      else if (variables.endTime) render = '종료 완료';
      else render = '기억 완료';
      toast.update('present', { render, autoClose: 1500, type: 'success' });
    },
  });
  return { updatePresent, isUpdating };
};

export const useSocketPresent = () => {
  const socket = io(`${import.meta.env.VITE_WS_SERVER_URL}/present`);
  const queryClient = useQueryClient();
  const setContent = useSetRecoilState(MarkdownAtom);
  const setStartTime = useSetRecoilState(StartTimeAtom);
  const setEndTime = useSetRecoilState(EndTimeAtom);
  const setTitle = useSetRecoilState(TitleAtom);

  socket.on('present-update', (data) => {
    queryClient.setQueryData(['present'], data);
    const { startTime, endTime, content, title } = data;
    if (startTime) setStartTime(new Date(startTime));
    if (endTime) setEndTime(new Date(endTime));
    if (content) setContent(content);
    if (title) setTitle(title);
  });
};
