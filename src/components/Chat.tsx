import { useRecoilState, useRecoilValue } from 'recoil';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';

import ChatButton from '@/components/ChatButton';
import { isChatOpenStore, isChatGeneratingStore, chatHistoryStore, currentChatStore } from '@/stores/Chat.store';
import ChatBubble from '@/components/ChatBubble';
import ChatDescribe from '@/constants/ChatDescribe';
import useChat from '@/hooks/useChat';
import { MobileSelector } from '@/stores/Layout.store';

export default function Chat() {
  const isChatOpen = useRecoilValue(isChatOpenStore);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [isChatGenerating, setIsChatGenerating] = useRecoilState(isChatGeneratingStore);
  const currentChat = useRecoilValue(currentChatStore);
  const [chatHistory, setChatHistory] = useRecoilState(chatHistoryStore);
  const cardTransition = isChatOpen ? '-translate-y-2.5 opacity-100' : 'translate-y-0 opacity-0';
  const [currentInput, setCurrentInput] = useState<string>('');
  const layout = useRecoilValue(MobileSelector);

  const { callChat } = useChat();
  const onClickSubmit = () => {
    setIsChatGenerating(true);
    setChatHistory((prev) => prev.concat({ direction: 'end', content: currentInput }));
    setCurrentInput('');
    callChat({ query: currentInput });
  };
  const onEnterQuery = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !isChatGenerating) {
      event.preventDefault();
      onClickSubmit();
    }
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isChatGenerating) setCurrentInput(event.target.value);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatHistory, currentChat, isChatGenerating]);

  return (
    <div className={`absolute ${layout === 'mobile' ? 'bottom-20' : 'bottom-4'} right-4 flex  flex-col gap-4`}>
      <div
        className={`card ${cardTransition} max-h-[70dvh] w-full max-w-[90dvw] border-[1px] border-accent bg-transparent p-4 backdrop-blur-2xl transition-all sm:max-h-[75dvh] sm:max-w-[60dvw] lg:max-w-[40dvw] `}
      >
        <div className="flex flex-col gap-6 overflow-y-scroll" ref={chatRef}>
          <ChatBubble direction="start" content={ChatDescribe} />
          {chatHistory.map((chat, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ChatBubble key={index} {...chat} />
          ))}
          {isChatGenerating && <ChatBubble direction="start" content={currentChat} />}
        </div>
        <div className="divider" />
        <div className="flex gap-2">
          <textarea
            placeholder="타임라인의 내용을 검색해주세요"
            className="textarea textarea-info max-h-[150px] flex-1"
            value={currentInput}
            onChange={onChangeInput}
            onKeyDown={onEnterQuery}
          />
          <button type="submit" onSubmit={onClickSubmit} disabled={isChatGenerating}>
            <img src="/assets/send.svg" alt="send" className="size-6" />
          </button>
        </div>
      </div>
      <ChatButton />
    </div>
  );
}
