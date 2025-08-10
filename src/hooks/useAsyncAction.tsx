'use client';
import { useState } from 'react';
import { toast } from 'sonner';

// 1) action() 의 반환값에 errors 프로퍼티가 있으면 이를 E로 추출
type ExtractErrors<T> = T extends { errors: infer E } ? E : never;

// 2) onValidateError 콜백 타입
//    - 만약 ExtractErrors<T>가 never 가 아니면 그 타입 E를, 아니면 void 로 설정
type OnValidateErrorCallback<T> = ExtractErrors<T> extends never ? never : (errors: ExtractErrors<T>) => void;

type Options<T> = {
  onSuccess?: (data: T) => void;
  onError?: (e: Error) => void;
  onValidateError?: OnValidateErrorCallback<T>;
  loadingMessage?: string;
};

export default function useAsyncAction<T extends Record<string, any> | void>(
  action: () => Promise<T>,
  options: Options<T> = {},
) {
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    const toastId = options.loadingMessage ? toast.loading(options.loadingMessage) : undefined;
    try {
      const data = await action();
      if (typeof data === 'object' && data.errors) {
        (options.onValidateError as OnValidateErrorCallback<T>)?.(data.errors);
        return;
      }
      options.onSuccess?.(data);
    } catch (e: any) {
      options.onError?.(e);
    } finally {
      setLoading(false);
      if (toastId !== undefined) toast.dismiss(toastId);
    }
  };

  return { run, loading };
}
