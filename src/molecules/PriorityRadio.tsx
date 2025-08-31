'use client';

import Container from '@/atoms/Container';
import { Button } from '@/components/ui/button';
import { useState, MouseEvent, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import PriorityBadgeClient from '@/atoms/PriorityBadgeClient';
import { useTranslations } from 'next-intl';

const PRIORITY = ['1', '2', '3'];
type PRIORITY = 1 | 2 | 3;

export default function PriorityRadio() {
  const [currentPriority, setCurrentPriority] = useState<PRIORITY>(1);
  const radioGroupRef = useRef<HTMLDivElement>(null);

  const t = useTranslations();

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const priorityValue = Number(e.currentTarget.id.split('-')[1]) as PRIORITY;
    setCurrentPriority(priorityValue);

    // 🎯 클릭 후 포커스 유지
    setTimeout(() => {
      const selectedButton = radioGroupRef.current?.querySelector(`#priority-${priorityValue}`) as HTMLButtonElement;
      selectedButton?.focus();
    }, 0);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement | HTMLDivElement>) => {
    const isArrowKey = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key);
    const isNumberKey = ['1', '2', '3'].includes(e.key);

    if (isArrowKey) {
      e.preventDefault();
      e.stopPropagation();

      let newPriority: PRIORITY;

      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        // 이전 우선순위로 (1 -> 3 -> 2 -> 1 순환)
        newPriority = currentPriority === 1 ? 3 : ((currentPriority - 1) as PRIORITY);
      } else {
        // 다음 우선순위로 (1 -> 2 -> 3 -> 1 순환)
        newPriority = currentPriority === 3 ? 1 : ((currentPriority + 1) as PRIORITY);
      }

      setCurrentPriority(newPriority);

      // 🔥 포커스를 새로 선택된 버튼으로 이동
      setTimeout(() => {
        const newButton = radioGroupRef.current?.querySelector(`#priority-${newPriority}`) as HTMLButtonElement;
        newButton?.focus();
      }, 0);
    } else if (isNumberKey) {
      // 🎯 숫자 키로 직접 선택
      e.preventDefault();
      e.stopPropagation();

      const newPriority = Number(e.key) as PRIORITY;
      setCurrentPriority(newPriority);

      setTimeout(() => {
        const newButton = radioGroupRef.current?.querySelector(`#priority-${newPriority}`) as HTMLButtonElement;
        newButton?.focus();
      }, 0);
    }
  };

  useEffect(() => {
    const handleRadioGroupFocus = () => {
      const selectedButton = radioGroupRef.current?.querySelector(`#priority-${currentPriority}`) as HTMLButtonElement;
      selectedButton?.focus();
    };

    const radioGroup = radioGroupRef.current;
    if (radioGroup) {
      radioGroup.addEventListener('focus', handleRadioGroupFocus);
      return () => radioGroup.removeEventListener('focus', handleRadioGroupFocus);
    }
  }, [currentPriority]);

  return (
    <Container>
      <div
        ref={radioGroupRef}
        role="radiogroup"
        aria-labelledby="priority-group-label"
        aria-describedby="priority-help"
        className="flex gap-2 w-full focus:outline-none"
        onKeyDown={onKeyDown}
        tabIndex={-1}
      >
        <span id="priority-group-label" className="sr-only">
          {t('a11y.priority.groupLabel')}
        </span>
        <span id="priority-help" className="sr-only">
          {t('a11y.priority.help')}
        </span>

        {PRIORITY.map((priority) => (
          <Button
            type="button"
            key={priority}
            id={`priority-${priority}`}
            variant="ghost"
            className="p-0 flex-1"
            onClick={onClick}
            onKeyDown={onKeyDown}
          >
            <PriorityBadgeClient
              priority={Number(priority) as PRIORITY}
              className={`size-full ${Number(priority) === currentPriority ? 'ring-2 ring-foreground/40' : 'ring-0'}`}
            />
          </Button>
        ))}
      </div>
      <Input type="hidden" value={currentPriority} name="priority" aria-hidden="true" />
    </Container>
  );
}
