'use client';

import {
  cleanUpImageAction,
  updatePresentContentAction,
  updatePresentEndAction,
  updatePresentStartAction,
} from '@/actions/updatePresent';
import { callActionWithToast } from '@/lib/utils/action';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

type ContextType = {
  title: string | null;
  startTime: string | null;
  initialContent: string | null;
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

export default function PresentTemplateClient(props: PresentClientTemplateProps) {
  const { title, startTime, initialContent, children } = props;
  const [currentContent, setCurrentContent] = useState(initialContent ?? '');

  const t = useTranslations('Toast.Present');
  const toastT = useTranslations('Toast.Future');

  const onTempSave = useCallback(async () => {
    await callActionWithToast(() => updatePresentContentAction(currentContent), toastT as (key: string) => string);
  }, [currentContent, toastT]);

  const onStart = useCallback(async () => {
    const loadingToast = toast.loading(t('loading'));
    updatePresentStartAction()
      .then(() => {
        toast.dismiss(loadingToast);
        toast.success(t('startSuccess'));
      })
      .catch(() => {
        toast.dismiss(loadingToast);
        toast.error(t('error'));
      });
  }, [t]);

  const onSave = useCallback(async () => {
    if (title === null || startTime === null) return;
    const loadingToast = toast.loading(t('loading'));
    updatePresentEndAction({
      title,
      startTime,
      endTime: new Date().toISOString(),
      content: currentContent,
    })
      .then(() => {
        toast.dismiss(loadingToast);
        toast.success(t('saveSuccess'));
        setCurrentContent('');
        cleanUpImageAction(startTime).then((res) => {
          if (res) toast.success(`${res}${t('cleanUpStorage')}`);
        });
      })
      .catch(() => {
        toast.dismiss(loadingToast);
        toast.error(t('error'));
      });
  }, [title, startTime, currentContent, t]);

  const contextValue = useMemo(
    () => ({
      currentContent,
      setCurrentContent,
      onTempSave,
      onSave,
      onStart,
      startTime,
      title,
      initialContent,
    }),
    [currentContent, onTempSave, onSave, onStart, startTime, title, initialContent],
  );
  return <PresentActionsContext.Provider value={contextValue}>{children}</PresentActionsContext.Provider>;
}
export const usePresentActions = () => {
  const ctx = useContext(PresentActionsContext);
  if (!ctx) throw new Error('usePresentActions must be used within PresentActionsProvider');
  return ctx;
};
