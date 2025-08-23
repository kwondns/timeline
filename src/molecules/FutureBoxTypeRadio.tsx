'use client';

import Container from '@/atoms/Container';
import { Button } from '@/components/ui/button';
import { Icon, IconType } from '@/atoms/Icon';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';

type FutureBoxType = 'check' | 'progress';

const TypeButton = ({
  type,
  onClick,
  className,
  text,
}: {
  type: FutureBoxType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className: string;
  text: string;
}) => (
  <Button id={type} type="button" variant="outline" className={`p-0 flex-1 ${className}`} onClick={onClick}>
    {Icon[type as IconType]}
    {text}
  </Button>
);

export default function FutureBoxTypeRadio() {
  const [selected, setSelected] = useState<FutureBoxType>('check');
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelected(e.currentTarget.id as FutureBoxType);
  };
  const checkClassName = selected === 'check' ? 'ring-2 ring-rose/40 border-none' : 'ring-0';
  const progressClassName = selected === 'progress' ? 'ring-2 ring-info/40 border-none' : 'ring-0';

  const t = useTranslations('Future');

  return (
    <Container className="gap-2">
      <TypeButton type="check" onClick={onClick} className={checkClassName} text={t('newBoxTypeCheckBox')} />
      <TypeButton type="progress" onClick={onClick} className={progressClassName} text={t('newBoxTypeProgress')} />
      <Input type="hidden" value={selected} name="type" />
    </Container>
  );
}
