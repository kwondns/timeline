'use client';

import Container from '@/atoms/Container';
import { Button } from '@/components/ui/button';
import PriorityBadge from '@/atoms/PriorityBadge';
import { useState, MouseEvent } from 'react';
import { Input } from '@/components/ui/input';

const PRIORITY = ['1', '2', '3'];
type PRIORITY = 1 | 2 | 3;

export default function PriorityRadio() {
  const [currentPriority, setCurrentPriority] = useState<PRIORITY>(1);

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    setCurrentPriority(Number(e.currentTarget.id) as PRIORITY);
  };

  return (
    <Container className="gap-2">
      {PRIORITY.map((priority) => (
        <Button key={priority} id={priority} variant="ghost" className="p-0 flex-1" onClick={onClick}>
          <PriorityBadge
            priority={Number(priority) as PRIORITY}
            className={`size-full ${Number(priority) === currentPriority ? 'ring-2 ring-foreground/40' : 'ring-0'}`}
          />
        </Button>
      ))}
      <Input type="hidden" value={currentPriority} name="priority" />
    </Container>
  );
}
