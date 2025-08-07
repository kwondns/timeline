'use client';

import Container from '@/atoms/Container';
import PresentInfo from '@/organisms/PresentInfo';
import Editor from '@/molecules/Editor';
import { useState } from 'react';
import { cleanUpImageAction, updatePresentContentAction, updatePresentEndAction } from '@/actions/updatePresent';
import { callActionWithToast } from '@/lib/action';
import { toast } from 'sonner';

export type PresentTemplateProps = {
  title: string | null;
  startTime: string | null;
  content: string | null;
};

export default function PresentTemplate(props: PresentTemplateProps) {
  const { title, startTime, content } = props;
  const [currentContent, setCurrentContent] = useState<string>(content ?? '');
  const onTempSave = async () => {
    await callActionWithToast(() => updatePresentContentAction(currentContent));
  };
  const onSave = async () => {
    if (title === null || startTime === null || currentContent === null) return;
    const loadingToast = toast.loading('기록중...');
    updatePresentEndAction({ title, startTime, endTime: new Date().toISOString(), content: currentContent })
      .then(() => {
        toast.dismiss(loadingToast);
        toast.success('기록 완료!');
        cleanUpImageAction(startTime).then((res) => toast.success(`${res}개 스토리지 정리!`));
      })
      .catch(() => {
        toast.dismiss(loadingToast);
        toast.error('기록 실패!');
      });
  };
  return (
    <Container direction="column" className="h-full px-4 pt-8">
      <PresentInfo
        title={title}
        from={startTime ? new Date(startTime) : null}
        onTempSave={onTempSave}
        onSave={onSave}
      />
      <Editor
        content={currentContent}
        startTimeString={startTime ?? ''}
        setContentAction={setCurrentContent}
        tempSaveAction={onTempSave}
      />
    </Container>
  );
}
