import { toast } from 'sonner';
import { useEffect, useState } from 'react';

const EMPTY_LOADING_STATE = '';
const TOAST_DELAY = 500;
const LOADING_MESSAGE = '생성중...';
const SUCCESS_MESSAGE = '생성 완료!';
const ERROR_MESSAGE = '생성 실패!';
const handleToastNotifications = (
  isPending: boolean,
  loading: string | number,
  state: boolean,
  setLoading: (value: string | number) => void,
) => {
  if (isPending) {
    if (loading === EMPTY_LOADING_STATE) {
      const toastId = toast.loading(LOADING_MESSAGE, {});
      setLoading(toastId);
    }
  } else if (loading !== EMPTY_LOADING_STATE) {
    setTimeout(() => {
      toast.dismiss(loading);
      const message = state ? SUCCESS_MESSAGE : ERROR_MESSAGE;
      const toastMethod = state ? toast.success : toast.error;
      toastMethod(message);
      setLoading(EMPTY_LOADING_STATE);
    }, TOAST_DELAY);
  }
};

export const useActionWithToast = (isPending: boolean, state: boolean) => {
  const [loading, setLoading] = useState<string | number>(EMPTY_LOADING_STATE);
  useEffect(
    () => handleToastNotifications(isPending, loading, state, setLoading),
    [isPending, state, loading, setLoading],
  );
};
