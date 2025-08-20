import { Card } from '@/components/ui/card';
import { forwardRef, useEffect, useState } from 'react';

type ChatCardProps = {
  isOpen: boolean;
  isMounted: boolean;
  children: React.ReactNode;
};
const ChatCard = forwardRef<HTMLDivElement, ChatCardProps>((props, ref) => {
  const { isOpen, isMounted, children } = props;
  const [transitionClass, setTransitionClass] = useState('translate-y-2.5 opacity-0');
  useEffect(() => {
    if (isMounted && isOpen) {
      // 마운트 후 최소 한 틱 지연
      requestAnimationFrame(() => {
        setTransitionClass('-translate-y-2.5 opacity-100');
      });
    } else {
      setTransitionClass('translate-y-0 opacity-0');
    }
  }, [isMounted, isOpen]);

  return (
    <Card
      className={`transition-all ${transitionClass} z-[1000] max-h-[70dvh] w-[90dvw] border-[1px]
         border-accent bg-transparent p-4 backdrop-blur-2xl transition-all sm:max-h-[75dvh]
          sm:w-[60dvw] lg:w-[40dvw]`}
      ref={ref}
    >
      {children}
    </Card>
  );
});

export default ChatCard;
