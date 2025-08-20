import Container from '@/atoms/Container';
import dynamic from 'next/dynamic';

const Mark = dynamic(() => import('@uiw/react-markdown-preview/nohighlight'), { ssr: false });

export type ChatBubbleProps = {
  isBot: boolean;
  text: string;
};

function ChatWaiting() {
  return (
    <div>
      <span className="inline-block animate-bounce">.</span>
      <span className="inline-block animate-bounce [animation-delay:100ms]">.</span>
      <span className="inline-block animate-bounce [animation-delay:200ms]">.</span>
    </div>
  );
}
export default function ChatBubble(props: ChatBubbleProps) {
  const { text, isBot } = props;
  const cls = isBot
    ? 'bg-secondary text-secondary-foreground self-start'
    : 'self-end bg-primary text-primary-foreground';
  return (
    <Container className={`max-w-[90%] whitespace-pre-line px-4 py-2 rounded-lg ${cls}`}>
      {text === '' ? (
        <ChatWaiting />
      ) : (
        <Mark
          source={text}
          className="!bg-inherit !text-inherit [&-ol]:leading-6 [&_ol]:list-decimal [&_ol]:flex-col [&_ol]:!pl-5 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:!pl-5 [&_ul]:leading-6"
          rehypeRewrite={(node, _, parent) => {
            if ('tagName' in node && node.tagName && parent && 'tagName' in parent && parent.tagName) {
              if (node.tagName === 'a' && /^h([1-6])/.test(parent.tagName)) {
                // eslint-disable-next-line no-param-reassign
                parent.children = parent.children.slice(1);
              }
            }
          }}
        />
      )}
    </Container>
  );
}
