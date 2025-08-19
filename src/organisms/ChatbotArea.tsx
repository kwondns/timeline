import ChatBubble, { ChatBubbleProps } from '@/molecules/ChatBubble';
import Container from '@/atoms/Container';
import { useRef, useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import useChat from '@/hooks/useChat';
import ChatInput from '@/molecules/ChatInput';
import ChatCard from '@/molecules/ChatCard';

type ChatbotAreaProps = {
  isOpen: boolean;
  userId: string | null;
};

const DESCRIBE = `과거의 작업을 검색할 수 있습니다.
예시)
- "2024년 2월에 GSAP 관련해서 뭘 작업했나요?"
- "가장 최근에 작업한 마크다운 스타일링 내용이 뭔가요?"
- "CSS 애니메이션 구현하는 방법이 뭐가 있나요?"
- "타임라인 관련 과거 작업들을 찾아주세요"
- "가장 최근에 작업한 React에 대한 내용은 뭐야?"
- "가장 최근에 작업한 내용들을 요약해줘"
- "가장 마지막 React 작업은 뭐였지?"
- "가장 마지막 작업 내용"
- "Next에서 캐싱을 다루는 작업은 언제했지?"
`;

export default function ChatbotArea(props: ChatbotAreaProps) {
  const { isOpen, userId } = props;
  const [isMounted, setIsMounted] = useState(isOpen);
  const [currentChat, setCurrentChat] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatBubbleProps[]>([]);
  const [isChatGenerating, setIsChatGenerating] = useState(false);
  const [currentInput, setCurrentInput] = useState<string>('');
  const chatRef = useRef<HTMLDivElement>(null);
  const chatBubblesRef = useRef<HTMLDivElement>(null);

  const { callChat } = useChat({ setCurrentChat, setChatHistory, setIsChatGenerating });
  useEffect(() => {
    if (isOpen) {
      // 열 때 바로 마운트
      setIsMounted(true);
    } else if (chatRef.current) {
      // 닫을 때 트랜지션이 끝나면 언마운트
      const onEnd = () => {
        setIsMounted(false);
        chatRef.current?.removeEventListener('transitionend', onEnd);
      };
      chatRef.current.addEventListener('transitionend', onEnd);
    }
  }, [setIsMounted, isOpen]);

  useEffect(() => {
    if (chatBubblesRef.current) {
      chatBubblesRef.current.scrollTop = chatBubblesRef.current.scrollHeight;
    }
  }, [chatHistory, currentChat, isChatGenerating]);

  const sendAction = () => {
    if (currentInput === '') return;
    setIsChatGenerating(true);
    setChatHistory((prev) => prev.concat({ isBot: false, text: currentInput }));
    setCurrentInput('');
    if (userId) callChat({ query: currentInput, userId });
  };

  if (isMounted)
    return (
      <ChatCard isOpen={isOpen} isMounted={isMounted} ref={chatRef}>
        <Container direction="column" className="gap-4 overflow-y-scroll scroll-smooth" ref={chatBubblesRef}>
          <ChatBubble isBot text={DESCRIBE} />
          {chatHistory.map((chat, index) => (
            <ChatBubble key={index} {...chat} />
          ))}
          {isChatGenerating && <ChatBubble isBot text={currentChat} />}
        </Container>
        <Separator />
        <ChatInput
          currentInput={currentInput}
          isChatGenerating={isChatGenerating}
          changeAction={setCurrentInput}
          sendAction={sendAction}
        />
      </ChatCard>
    );
  return null;
}
