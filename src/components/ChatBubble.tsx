import Mark from '@uiw/react-markdown-preview/nohighlight';

type ChatBubbleProps = {
  direction: 'end' | 'start';
  content: string;
};
export default function ChatBubble(props: ChatBubbleProps) {
  const { direction, content } = props;
  return (
    <div className={`chat ${direction === 'end' ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-bubble bg-neutral-content py-3 dark:bg-[var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)))]">
        <Mark
          source={content}
          className="!bg-transparent !text-base [&-ol]:leading-6 [&_ol]:list-decimal [&_ol]:flex-col [&_ol]:!pl-5 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:!pl-5 [&_ul]:leading-6"
          rehypeRewrite={(node, _, parent) => {
            if ('tagName' in node && node.tagName && parent && 'tagName' in parent && parent.tagName) {
              if (node.tagName === 'a' && /^h([1-6])/.test(parent.tagName)) {
                // eslint-disable-next-line no-param-reassign
                parent.children = parent.children.slice(1);
              }
            }
          }}
        />
      </div>
    </div>
  );
}
