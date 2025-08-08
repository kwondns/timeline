'use client';

import { Button } from '@/components/ui/button';
import { Icon } from '@/atoms/Icon';
import Typography from '@/atoms/Typography';
import { Dispatch, SetStateAction } from 'react';

type ChatButtonProps = {
  isOpen: boolean;
  setIsOpenAction: Dispatch<SetStateAction<boolean>>;
};

export default function ChatButton(props: ChatButtonProps) {
  const { isOpen, setIsOpenAction } = props;
  const onClickButton = () => {
    setIsOpenAction((prev) => !prev);
  };
  return (
    <Button className="relative w-16 z-[1000] rounded-4xl !px-10 self-end" variant="outline" onClick={onClickButton}>
      <div
        className={`absolute inset-0 flex items-center justify-center space-x-1 transition-all duration-200 ease-in-out [&_svg]:!size-10 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}}}`}
      >
        {Icon.close}
      </div>
      <div
        className={`
            absolute inset-0 flex items-center justify-center space-x-1
            transition-all duration-200 ease-in-out
            ${isOpen ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}
          `}
      >
        {Icon.message}
        <Typography.span>챗봇</Typography.span>
      </div>
    </Button>
  );
}
