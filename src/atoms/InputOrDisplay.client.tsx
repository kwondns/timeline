'use client';

import Typography, { TypographyComponentType, TypographyPropsType } from '@/atoms/Typography';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';

export type InputOrDisplayProps = {
  typo: TypographyComponentType;
  action: () => void;
  initValue?: string;
  value?: string;
  setValue: Dispatch<SetStateAction<string>>;
  className?: string;
  inputClassName?: string;
  typoClassName?: string;
  placeholder?: string;
} & (React.ComponentProps<'input'> | TypographyPropsType[TypographyComponentType]);
export default function InputOrDisplayClient(props: InputOrDisplayProps) {
  const {
    typo,
    action,
    initValue = '',
    value = '',
    setValue,
    className = '',
    inputClassName = '',
    typoClassName = '',
    placeholder = '',
    ...others
  } = props;
  const [status, setStatus] = useState<'typo' | 'input'>(initValue ? 'typo' : 'input');
  const TypoComponent = Typography[typo];
  const onDoubleClickTypoComponent = () => {
    setStatus('input');
  };
  useEffect(() => {
    setStatus(initValue ? 'typo' : 'input');
  }, [initValue]);
  const onEnterInputComponent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      setStatus('typo');
    }
    if (e.key === 'Enter') action();
    if (e.key === 'Escape') setValue(initValue);
  };

  const onChangeInputComponent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  if (status === 'typo')
    return (
      <TypoComponent
        className={`cursor-text ${className} ${typoClassName}`}
        onDoubleClick={onDoubleClickTypoComponent}
        {...others}
      >
        {value}
      </TypoComponent>
    );
  return (
    <Input
      className={`${className} ${inputClassName}`}
      value={value}
      onKeyDown={onEnterInputComponent}
      onChange={onChangeInputComponent}
      placeholder={placeholder}
      {...others}
    />
  );
}
