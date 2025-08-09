import { toast } from 'sonner';
import { useEffect, useState } from 'react';

const EMPTY_LOADING_STATE = '';
const TOAST_DELAY = 500;
const TOAST_OPTIONS = {
  sign: { LOADING_MESSAGE: '인증중...', SUCCESS_MESSAGE: '인증 완료!', ERROR_MESSAGE: '인증 실패!' },
  create: {
    LOADING_MESSAGE: '생성중...',
    SUCCESS_MESSAGE: '생성 완료!',
    ERROR_MESSAGE: '생성 실패!',
  },
};
const handleToastNotifications = (
  isPending: boolean,
  loading: string | number,
  state: boolean,
  setLoading: (value: string | number) => void,
  type: 'sign' | 'create' = 'create',
) => {
  if (isPending) {
    if (loading === EMPTY_LOADING_STATE) {
      const toastId = toast.loading(TOAST_OPTIONS[type].LOADING_MESSAGE, {});
      setLoading(toastId);
    }
  } else if (loading !== EMPTY_LOADING_STATE) {
    setTimeout(() => {
      toast.dismiss(loading);
      const message = state ? TOAST_OPTIONS[type].SUCCESS_MESSAGE : TOAST_OPTIONS[type].ERROR_MESSAGE;
      const toastMethod = state ? toast.success : toast.error;
      toastMethod(message);
      setLoading(EMPTY_LOADING_STATE);
    }, TOAST_DELAY);
  }
};

export const useActionWithToast = (isPending: boolean, state: boolean, type: 'sign' | 'create' = 'create') => {
  const [loading, setLoading] = useState<string | number>(EMPTY_LOADING_STATE);
  useEffect(
    () => handleToastNotifications(isPending, loading, state, setLoading, type),
    [isPending, state, loading, setLoading, type],
  );
};
