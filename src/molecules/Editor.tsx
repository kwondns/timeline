'use client';

import Container from '@/atoms/Container';
import MDEditor from '@uiw/react-md-editor';

export default function Editor() {
  return (
    <Container className="max-h-full w-full flex-1 overflow-auto py-4">
      <MDEditor
        className="flex w-full flex-1 [&_img]:mx-auto [&_img]:!flex [&_img]:max-h-[500px] [&_ol]:list-decimal [&_ul]:list-disc"
        height="100%"
        textareaProps={{
          placeholder: '꾸준히 작성하자!',
        }}
      />
    </Container>
  );
}
