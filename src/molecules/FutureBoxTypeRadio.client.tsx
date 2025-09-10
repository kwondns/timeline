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
  selected,
}: {
  type: FutureBoxType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className: string;
  text: string;
  selected: boolean;
}) => (
  <Button
    id={type}
    type="button"
    variant="outline"
    className={`p-0 flex-1 ${className}`}
    onClick={onClick}
    role="radio"
    aria-checked={selected}
    aria-labelledby={`${type}-label`}
    tabIndex={selected ? 0 : -1}
  >
    <span id={`${type}-label`} className="flex items-center gap-2">
      {Icon[type as IconType]}
      {text}
    </span>
  </Button>
);
type FutureBoxTypeRadioProps = {
  'aria-describedby'?: string;
};

export default function FutureBoxTypeRadioClient({ 'aria-describedby': ariaDescribedBy }: FutureBoxTypeRadioProps) {
  const [selected, setSelected] = useState<FutureBoxType>('check');
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelected(e.currentTarget.id as FutureBoxType);
  };
  const checkClassName = selected === 'check' ? 'ring-2 ring-rose/40 border-none' : 'ring-0';
  const progressClassName = selected === 'progress' ? 'ring-2 ring-info/40 border-none' : 'ring-0';

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected(selected === 'check' ? 'progress' : 'check');
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected(selected === 'check' ? 'progress' : 'check');
    }
  };

  const t = useTranslations('Future');

  return (
    <Container>
      <div
        role="radiogroup"
        aria-labelledby="box-type-group-label"
        aria-describedby={ariaDescribedBy}
        onKeyDown={onKeyDown}
        className="flex gap-2 w-full"
      >
        <TypeButton
          type="check"
          onClick={onClick}
          className={checkClassName}
          text={t('newBoxTypeCheckBox')}
          selected={selected === 'check'}
        />
        <TypeButton
          type="progress"
          onClick={onClick}
          className={progressClassName}
          text={t('newBoxTypeProgress')}
          selected={selected === 'progress'}
        />
      </div>
      <Input type="hidden" value={selected} name="type" aria-hidden="true" />
    </Container>
  );
}
