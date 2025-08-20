'use client';

import { imgLazyLoading } from '@/lib/utils/markdown';
import dynamic from 'next/dynamic';

type MarkdownProps = {
  source: string;
};

const Editor = dynamic(async () => import('@uiw/react-md-editor').then((module) => module.default.Markdown), {
  ssr: false,
});
export default function MarkdownViewer(props: MarkdownProps) {
  const { source } = props;
  return (
    <Editor
      className="!bg-info/10 rounded-2xl p-4 [&_img]:mx-auto [&_img]:!flex [&_img]:max-h-[500px] [&_ol]:list-decimal [&_ul]:list-disc"
      source={source}
      rehypeRewrite={(node, _, parent) => {
        if ('tagName' in node && node.tagName && parent && 'tagName' in parent && parent.tagName) {
          if (node.tagName === 'a' && /^h([1-6])/.test(parent.tagName)) {
            parent.children = parent.children.slice(1);
          }
        }
      }}
      rehypePlugins={[imgLazyLoading]}
    />
  );
}
