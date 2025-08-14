'use client';

import {
  cleanUpImageAction,
  updatePresentContentAction,
  updatePresentEndAction,
  updatePresentStartAction,
} from '@/actions/updatePresent';
import { callActionWithToast } from '@/lib/action';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { toast } from 'sonner';

type ContextType = {
  currentContent: string;
  setCurrentContent: (val: string) => void;
  onTempSave: () => Promise<void>;
  onSave: () => Promise<void>;
  onStart: () => Promise<void>;
};

type PresentClientTemplateProps = {
  title: string | null;
  startTime: string | null;
  initialContent: string | null;
  children: React.ReactNode;
};
const PresentActionsContext = createContext<ContextType | null>(null);

export default function PresentClientTemplate(props: PresentClientTemplateProps) {
  const { title, startTime, initialContent, children } = props;
  const [currentContent, setCurrentContent] = useState(initialContent ?? '');

  const onTempSave = useCallback(async () => {
    await callActionWithToast(() => updatePresentContentAction(currentContent));
  }, [currentContent]);

  const onStart = useCallback(async () => {
    const loadingToast = toast.loading('기록중...');
    updatePresentStartAction()
      .then(() => {
        toast.dismiss(loadingToast);
        toast.success('기록 시작!');
      })
      .catch(() => {
        toast.dismiss(loadingToast);
        toast.error('기록 실패!');
      });
  }, []);

  const onSave = useCallback(async () => {
    if (title === null || startTime === null) return;
    const loadingToast = toast.loading('기록중...');
    updatePresentEndAction({
      title,
      startTime,
      endTime: new Date().toISOString(),
      content: currentContent,
    })
      .then(() => {
        toast.dismiss(loadingToast);
        toast.success('기록 완료!');
        setCurrentContent('');
        cleanUpImageAction(startTime).then((res) => {
          if (res) toast.success(`${res}개 스토리지 정리!`);
        });
      })
      .catch(() => {
        toast.dismiss(loadingToast);
        toast.error('기록 실패!');
      });
  }, [title, startTime, currentContent]);

  const contextValue = useMemo(
    () => ({
      currentContent,
      setCurrentContent,
      onTempSave,
      onSave,
      onStart,
    }),
    [currentContent, onTempSave, onSave, onStart],
  );
  return <PresentActionsContext.Provider value={contextValue}>{children}</PresentActionsContext.Provider>;
}
export const usePresentActions = () => {
  const ctx = useContext(PresentActionsContext);
  if (!ctx) throw new Error('usePresentActions must be used within PresentActionsProvider');
  return ctx;
};
