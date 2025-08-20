import { ChatBubbleProps } from '@/molecules/ChatBubble';
import { Dispatch, SetStateAction, useCallback } from 'react';

interface UseChatType {
  setCurrentChat: Dispatch<SetStateAction<string>>;
  setChatHistory: Dispatch<SetStateAction<ChatBubbleProps[]>>;
  setIsChatGenerating: Dispatch<SetStateAction<boolean>>;
}
const useChat = ({ setCurrentChat, setIsChatGenerating, setChatHistory }: UseChatType) => {
  const callChat = useCallback(
    async (payload: { query: string; user_id: string }) => {
      let responseContent = '';
      const response = await fetch(`${process.env.NEXT_PUBLIC_CHATBOT_URL}chat`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          Accept: 'text/event-stream', // SSE 미디어 타입
          'Content-Type': 'application/json',
        },
      });
      if (!response.body) return;

      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();

      let isDone = false;
      while (!isDone) {
        // eslint-disable-next-line no-await-in-loop
        const { done, value } = await reader.read();
        if (done) {
          isDone = done;
        } else {
          responseContent += value;
          setCurrentChat(responseContent);
        }
      }
      setIsChatGenerating(false);
      setChatHistory((prev) => prev.concat({ isBot: true, text: responseContent }));
      setCurrentChat('');
    },
    [setIsChatGenerating, setChatHistory, setCurrentChat],
  );
  return { callChat };
};

export default useChat;
