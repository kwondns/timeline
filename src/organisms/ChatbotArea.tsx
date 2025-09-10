import ChatBubble, { ChatBubbleProps } from '@/molecules/ChatBubble';
import Container from '@/atoms/Container';
import { useRef, useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import useChat from '@/hooks/useChat';
import ChatInputClient from '@/molecules/ChatInput.client';
import ChatCardClient from '@/molecules/ChatCard.client';
import { useLocale, useTranslations } from 'next-intl';

type ChatbotAreaProps = {
  isOpen: boolean;
  userId: string | null;
};

export default function ChatbotArea(props: ChatbotAreaProps) {
  const { isOpen, userId } = props;
  const [isMounted, setIsMounted] = useState(isOpen);
  const [currentChat, setCurrentChat] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatBubbleProps[]>([]);
  const [isChatGenerating, setIsChatGenerating] = useState(false);
  const [currentInput, setCurrentInput] = useState<string>('');
  const chatRef = useRef<HTMLDivElement>(null);
  const chatBubblesRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('Chat');
  const locale = useLocale();

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
    if (userId) callChat({ query: currentInput, user_id: userId, locale });
  };

  if (isMounted)
    return (
      <ChatCardClient isOpen={isOpen} isMounted={isMounted} ref={chatRef}>
        <Container direction="column" className="gap-4 overflow-y-scroll scroll-smooth" ref={chatBubblesRef}>
          <ChatBubble isBot text={t('description')} />
          {chatHistory.map((chat, index) => (
            <ChatBubble key={index} {...chat} />
          ))}
          {isChatGenerating && <ChatBubble isBot text={currentChat} />}
        </Container>
        <Separator />
        <ChatInputClient
          currentInput={currentInput}
          isChatGenerating={isChatGenerating}
          changeAction={setCurrentInput}
          sendAction={sendAction}
        />
      </ChatCardClient>
    );
  return null;
}
