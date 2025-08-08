'use client';

import ChatButton from '@/molecules/ChatButton';
import ChatbotArea from '@/organisms/ChatbotArea';
import Container from '@/atoms/Container';
import { useState } from 'react';

export default function ChatbotTemplate() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container direction="column" className="absolute bottom-4 right-4 gap-2">
      <ChatbotArea isOpen={isOpen} />
      <ChatButton isOpen={isOpen} setIsOpenAction={setIsOpen} />
    </Container>
  );
}
