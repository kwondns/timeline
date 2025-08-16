import { toast } from 'sonner';
import { useEffect, useRef } from 'react';

const TOAST_DELAY = 300;
const TOAST_OPTIONS = {
  sign: { LOADING: '인증중...', SUCCESS: '인증 완료!', ERROR: '인증 실패!' },
  create: { LOADING: '생성중...', SUCCESS: '생성 완료!', ERROR: '생성 실패!' },
};

export const useActionWithToast = (isPending: boolean, state: boolean, type: 'sign' | 'create' = 'create') => {
  const toastIdRef = useRef<string | number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 로딩 on/off
  useEffect(() => {
    if (isPending) {
      if (!toastIdRef.current) {
        toastIdRef.current = toast.loading(TOAST_OPTIONS[type].LOADING);
      }
    } else {
      // 요청 종료: 로딩 토스트 정리 후 결과 토스트
      if (toastIdRef.current) {
        const id = toastIdRef.current;
        toastIdRef.current = null;

        // 이전 딜레이 타이머 클리어
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }

        timeoutRef.current = setTimeout(() => {
          toast.dismiss(id);
          if (state) toast.success(TOAST_OPTIONS[type].SUCCESS);
          else toast.error(TOAST_OPTIONS[type].ERROR);
        }, TOAST_DELAY);
      }
    }
  }, [isPending, state, type]);

  // 언마운트 시 로딩 토스트 강제 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
        toastIdRef.current = null;
      }
    };
  }, []);
};
