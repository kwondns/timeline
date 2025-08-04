'use client';

import MDEditor from '@uiw/react-md-editor';

import { imgLazyLoading } from '@/lib/markdown';

type MarkdownProps = {
  source: string;
};
export default function Markdown(props: MarkdownProps) {
  const { source } = props;
  return (
    <MDEditor.Markdown
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
