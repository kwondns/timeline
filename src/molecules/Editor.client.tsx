'use client';

import { onImagePasted } from '@/lib/utils/markdown';
import { usePresentActions } from '@/templates/Present.template.client';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import NextImage from '@/atoms/NextImage';
import { useEffect } from 'react';

const MDEditor = dynamic(() => import('@uiw/react-md-editor').then((mod) => mod.default), { ssr: false });

type EditorProps = {
  startTimeString: string;
};

export default function EditorClient(props: EditorProps) {
  const { startTimeString } = props;
  const { currentContent, setCurrentContent, onTempSave } = usePresentActions();

  const t = useTranslations();

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 's') {
      event.preventDefault();
      onTempSave();
    }
  };

  useEffect(() => {
    const intervalTempSave = setInterval(
      () => {
        onTempSave();
      },
      1000 * 60 * 5,
    );
    return () => clearInterval(intervalTempSave);
  }, [onTempSave]);
  return (
    <MDEditor
      id="content"
      className="flex h-full w-full flex-1 [&_img]:mx-auto [&_img]:!flex [&_img]:max-h-[500px] [&_ol]:list-decimal [&_ul]:list-disc"
      height="100%"
      value={currentContent}
      previewOptions={{
        components: { img: NextImage },
      }}
      onChange={(value) => {
        setCurrentContent(value as string);
      }}
      onPaste={async (event) => {
        await onImagePasted(
          event,
          event.clipboardData,
          startTimeString,
          setCurrentContent,
          t('Toast.Present.startFirst'),
        );
      }}
      onDrop={async (event) => {
        await onImagePasted(
          event,
          event.dataTransfer,
          startTimeString,
          setCurrentContent,
          t('Toast.Present.startFirst'),
        );
      }}
      textareaProps={{
        placeholder: t('Present.contentPlaceholder'),
      }}
      onKeyDown={onKeyDown}
    />
  );
}
