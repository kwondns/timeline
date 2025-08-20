import { useSetRecoilState } from 'recoil';
import { useCallback } from 'react';

import { chatHistoryStore, currentChatStore, isChatGeneratingStore } from '@/stores/Chat.store';

const useChat = () => {
  const setCurrentChat = useSetRecoilState(currentChatStore);
  const setIsChatGenerating = useSetRecoilState(isChatGeneratingStore);
  const setChatHistory = useSetRecoilState(chatHistoryStore);
  const callChat = useCallback(
    async (payload: { query: string }) => {
      let responseContent = '';
      const response = await fetch(`${import.meta.env.VITE_CHATBOT_URL}chat`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          Accept: 'text/event-stream', // SSE 미디어 타입
          'Content-Type': 'application/json',
          'is-legacy': 'true',
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
      setChatHistory((prev) => prev.concat({ direction: 'start', content: responseContent }));
      setCurrentChat('');
    },
    [setIsChatGenerating, setChatHistory, setCurrentChat],
  );
  return { callChat };
};

export default useChat;
