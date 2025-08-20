'use client';

import { onImagePasted } from '@/lib/utils/markdown';
import { usePresentActions } from '@/templates/PresentClient.template';
import dynamic from 'next/dynamic';

const MDEditor = dynamic(() => import('@uiw/react-md-editor').then((mod) => mod.default), { ssr: false });

type EditorProps = {
  startTimeString: string;
};

export default function Editor(props: EditorProps) {
  const { startTimeString } = props;
  const { currentContent, setCurrentContent, onTempSave } = usePresentActions();

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 's') {
      event.preventDefault();
      onTempSave();
    }
  };
  return (
    <MDEditor
      id="content"
      className="flex h-full w-full flex-1 [&_img]:mx-auto [&_img]:!flex [&_img]:max-h-[500px] [&_ol]:list-decimal [&_ul]:list-disc"
      height="100%"
      value={currentContent}
      onChange={(value) => {
        setCurrentContent(value as string);
      }}
      onPaste={async (event) => {
        await onImagePasted(event, event.clipboardData, startTimeString, setCurrentContent);
      }}
      onDrop={async (event) => {
        await onImagePasted(event, event.dataTransfer, startTimeString, setCurrentContent);
      }}
      textareaProps={{
        placeholder: '꾸준히 작성하자!',
      }}
      onKeyDown={onKeyDown}
    />
  );
}
