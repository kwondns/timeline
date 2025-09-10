'use client';

import { updateFutureAction } from '@/actions/updateFuture';
import InputOrDisplayClient from '@/atoms/InputOrDisplay.client';
import { useState } from 'react';
import { callActionWithToast } from '@/lib/utils/action';
import { useTranslations } from 'next-intl';

type FutureInputOrDisplayProps = {
  id: string;
  value: string;
  category: 'future' | 'box';
};

const FUTURE_INPUT_OR_DISPLAY_CONFIG = {
  future: {
    TYPO: 'p',
    CLASS_NAME: {
      inputClassName: 'py-0 px-1 h-6',
      typoClassName: 'px-1 w-full',
    },
  },
  box: {
    TYPO: 'h3',
    CLASS_NAME: { inputClassName: '!text-2xl mr-2 pl-1' },
  },
} as const;
export default function FutureInputOrDisplayClient(props: FutureInputOrDisplayProps) {
  const { id, value, category } = props;
  const [currentValue, setCurrentValue] = useState(value);
  const t = useTranslations('Toast.Future');
  const handleUpdate = async () => {
    if (currentValue === value) return;
    await callActionWithToast(
      () => updateFutureAction({ id, value: currentValue, category }),
      t as (key: string) => string,
    );
  };

  return (
    <InputOrDisplayClient
      action={handleUpdate}
      id={id}
      typo={FUTURE_INPUT_OR_DISPLAY_CONFIG[category].TYPO}
      value={currentValue}
      setValue={setCurrentValue}
      initValue={value}
      {...FUTURE_INPUT_OR_DISPLAY_CONFIG[category].CLASS_NAME}
    />
  );
}
