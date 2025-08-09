'use client';

import ChatButton from '@/molecules/ChatButton';
import ChatbotArea from '@/organisms/ChatbotArea';
import Container from '@/atoms/Container';
import { useState } from 'react';
import { useSelectedLayoutSegments } from 'next/navigation';

export default function ChatbotTemplate() {
  const [isOpen, setIsOpen] = useState(false);
  const segment = useSelectedLayoutSegments('children');
  if (segment[0] === 'sign') return null;
  return (
    <Container direction="column" className="fixed bottom-4 right-4 gap-2">
      <ChatbotArea isOpen={isOpen} />
      <ChatButton isOpen={isOpen} setIsOpenAction={setIsOpen} />
    </Container>
  );
}
