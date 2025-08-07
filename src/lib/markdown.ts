import { ClipboardEvent, DragEvent } from 'react';
import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { uploadImageAction } from '@/actions/updatePresent';
import { toast } from 'sonner';

type TreeNodeType = {
  tagName: string;
  properties: {
    loading: string;
    src: string;
    alt: string;
    [key: string]: string;
  };
  type: string;
  children: TreeNodeType[];
  position: {
    start: {
      line: number;
      column: number;
      offset: number;
    };
    end: {
      line: number;
      column: number;
      offset: number;
    };
  };
};
export const imgLazyLoading: Plugin = () => (tree) => {
  visit(tree, 'element', (node: TreeNodeType) => {
    if (node.tagName === 'img' && node.properties) {
      node.properties.loading = 'lazy';
    }
  });
};

const insertToTextArea = (insertString: string) => {
  const textarea = document.querySelector('textarea');
  if (!textarea) {
    return null;
  }

  let sentence = textarea.value;
  const len = sentence.length;
  const pos = textarea.selectionStart;
  const end = textarea.selectionEnd;

  const front = sentence.slice(0, pos);
  const back = sentence.slice(pos, len);

  sentence = front + insertString + back;

  textarea.value = sentence;
  textarea.selectionEnd = end + insertString.length;

  return sentence;
};

export const onImagePasted = async (
  event: ClipboardEvent<HTMLDivElement> | DragEvent<HTMLDivElement>,
  dataTransfer: DataTransfer,
  uri: string,
  setMarkdown: (value: string) => void,
) => {
  const files: File[] = [];
  for (let index = 0; index < dataTransfer.items.length; index += 1) {
    const file = dataTransfer.files.item(index);

    if (file) {
      event.preventDefault();
      files.push(file);
      if (uri === '') {
        toast.error('작업을 먼저 시작해주세요!');
        return;
      }
    }
  }
  let result: string[] = [];
  await Promise.allSettled(
    files.map(async (file) => {
      result = await uploadImageAction({ file, num: files.length, uri });
    }),
  );
  result.forEach((route: string) => {
    const insertedMarkdown = insertToTextArea(`![](${process.env.NEXT_PUBLIC_IMAGE_URL}/${route})`);
    if (!insertedMarkdown) {
      return;
    }
    setMarkdown(insertedMarkdown);
  });
};
