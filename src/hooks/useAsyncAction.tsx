'use client';
import { useState } from 'react';
import { toast } from 'sonner';

type Options<T> = {
  onSuccess?: (data: T) => void;
  onError?: (e: Error) => void;
  loadingMessage?: string;
};

export default function useAsyncAction<T>(action: () => Promise<T>, options: Options<T> = {}) {
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    const toastId = options.loadingMessage ? toast.loading(options.loadingMessage) : undefined;
    try {
      const data = await action();
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
