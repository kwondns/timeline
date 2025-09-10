'use client';

import ChatButtonClient from '@/molecules/ChatButton.client';
import Container from '@/atoms/Container';
import { useState } from 'react';
import { useSelectedLayoutSegments } from 'next/navigation';
import dynamic from 'next/dynamic';

const ChatbotArea = dynamic(() => import('../organisms/ChatbotArea'), { ssr: false });

type ChatbotTemplateProps = {
  userId: string | null;
};
export default function ChatbotTemplateClient(props: ChatbotTemplateProps) {
  const { userId } = props;
  const [isOpen, setIsOpen] = useState(false);
  const segment = useSelectedLayoutSegments('children');
  if (segment[0] === 'sign') return null;
  return (
    <Container direction="column" className="fixed bottom-4 right-4 gap-2">
      <ChatbotArea isOpen={isOpen} userId={userId} />
      <ChatButtonClient isOpen={isOpen} setIsOpenAction={setIsOpen} />
    </Container>
  );
}
