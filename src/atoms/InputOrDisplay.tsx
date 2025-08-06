'use client';

import Typography, { TypographyComponentType, TypographyPropsType } from '@/atoms/Typography';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

type InputOrDisplayProps = {
  typo: TypographyComponentType;
  value?: string;
  className?: string;
  inputClassName?: string;
  typoClassName?: string;
  placeholder?: string;
} & (React.ComponentProps<'input'> | TypographyPropsType[TypographyComponentType]);
export default function InputOrDisplay(props: InputOrDisplayProps) {
  const {
    value = '',
    typo,
    className = '',
    inputClassName = '',
    typoClassName = '',
    placeholder = '',
    ...others
  } = props;
  const [status, setStatus] = useState<'typo' | 'input'>(value ? 'typo' : 'input');
  const [currentValue, setCurrentValue] = useState(value);
  const TypoComponent = Typography[typo];
  const onDoubleClickTypoComponent = () => {
    setStatus('input');
  };
  const onEnterInputComponent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      setStatus('typo');
    }
  };

  const onChangeInputComponent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.currentTarget.value);
  };
  if (status === 'typo')
    return (
      <TypoComponent
        className={`cursor-text ${className} ${typoClassName}`}
        onDoubleClick={onDoubleClickTypoComponent}
        {...others}
      >
        {currentValue}
      </TypoComponent>
    );
  return (
    <Input
      className={`${className} ${inputClassName}`}
      value={currentValue}
      onKeyDown={onEnterInputComponent}
      onChange={onChangeInputComponent}
      placeholder={placeholder}
      {...others}
    />
  );
}
