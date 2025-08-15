import { toast } from 'sonner';
import { useEffect, useRef } from 'react';

const TOAST_DELAY = 500;
const TOAST_OPTIONS = {
  sign: { LOADING_MESSAGE: '인증중...', SUCCESS_MESSAGE: '인증 완료!', ERROR_MESSAGE: '인증 실패!' },
  create: {
    LOADING_MESSAGE: '생성중...',
    SUCCESS_MESSAGE: '생성 완료!',
    ERROR_MESSAGE: '생성 실패!',
  },
};

export const useActionWithToast = (isPending: boolean, state: boolean, type: 'sign' | 'create' = 'create') => {
  const toastIdRef = useRef<string | number | null>(null);
  useEffect(() => {
    if (isPending) {
      // 아직 토스트가 없으면 로딩 토스트 생성
      if (!toastIdRef.current) {
        toastIdRef.current = toast.loading(TOAST_OPTIONS[type].LOADING_MESSAGE);
      }
    } else {
      // 요청이 종료되면 로딩 토스트 dismiss 후 성공/실패 토스트 출력
      if (toastIdRef.current) {
        const currentToastId = toastIdRef.current; // 클로저 안전
        toastIdRef.current = null;

        setTimeout(() => {
          toast.dismiss(currentToastId);
          if (state) {
            toast.success(TOAST_OPTIONS[type].SUCCESS_MESSAGE);
          } else {
            toast.error(TOAST_OPTIONS[type].ERROR_MESSAGE);
          }
        }, TOAST_DELAY);
      }
    }
  }, [isPending, state, type]);
};
