'use client';

import Container from '@/atoms/Container';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Icon } from '@/atoms/Icon';
import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction } from 'react';

type ChatInputProps = {
  currentInput: string;
  isChatGenerating: boolean;
  changeAction: Dispatch<SetStateAction<string>>;
  sendAction: () => void;
};
export default function ChatInputClient(props: ChatInputProps) {
  const { currentInput, isChatGenerating, sendAction, changeAction } = props;
  const onClickSubmit = () => {
    sendAction();
  };

  const onChangeInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!isChatGenerating) changeAction(event.target.value);
  };

  const onEnterQuery = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !isChatGenerating) {
      event.preventDefault();
      sendAction();
    }
  };
  return (
    <Container className="gap-2">
      <Textarea
        id="chat-input"
        maxLength={200}
        value={currentInput}
        className="min-h-[1.2em] leading-[1.2em] max-h-[calc(1.2em*5)] overflow-y-auto"
        rows={1}
        disabled={isChatGenerating}
        onChange={onChangeInput}
        onKeyDown={onEnterQuery}
      />
      <Button type="button" variant="outline" className="h-auto" onClick={onClickSubmit} disabled={isChatGenerating}>
        {Icon.send}
      </Button>
    </Container>
  );
}
