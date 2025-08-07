'use client';

import Container from '@/atoms/Container';
import { onImagePasted } from '@/lib/markdown';
import MDEditor from '@uiw/react-md-editor';

type EditorProps = {
  content: string;
  setContentAction: (value: string) => void;
  startTimeString: string;
  tempSaveAction: () => void;
};

export default function Editor(props: EditorProps) {
  const { content, setContentAction, startTimeString, tempSaveAction } = props;
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 's') {
      event.preventDefault();
      tempSaveAction();
    }
  };
  return (
    <Container className="h-full w-full flex-1 overflow-auto pt-4">
      <MDEditor
        id="content"
        className="flex h-full w-full flex-1 [&_img]:mx-auto [&_img]:!flex [&_img]:max-h-[500px] [&_ol]:list-decimal [&_ul]:list-disc"
        height="100%"
        value={content}
        onChange={(value) => {
          setContentAction(value as string);
        }}
        onPaste={async (event) => {
          await onImagePasted(event, event.clipboardData, startTimeString, setContentAction);
        }}
        onDrop={async (event) => {
          await onImagePasted(event, event.dataTransfer, startTimeString, setContentAction);
        }}
        textareaProps={{
          placeholder: '꾸준히 작성하자!',
        }}
        onKeyDown={onKeyDown}
      />
    </Container>
  );
}
