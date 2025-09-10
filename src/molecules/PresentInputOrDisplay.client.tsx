'use client';

import InputOrDisplayClient from '@/atoms/InputOrDisplay.client';
import { useEffect, useState } from 'react';
import { callActionWithToast } from '@/lib/utils/action';
import { updatePresentTitleAction } from '@/actions/updatePresent';
import { useTranslations } from 'next-intl';

type PresentInputOrDisplayProps = {
  title: string | null;
};
export default function PresentInputOrDisplayClient(props: PresentInputOrDisplayProps) {
  const { title } = props;
  const [value, setValue] = useState(title ?? '');
  const t = useTranslations('Present');
  const toastT = useTranslations('Toast.Future');
  const handleUpdate = async () => {
    if (value === title) return;
    await callActionWithToast(() => updatePresentTitleAction(value), toastT as (key: string) => string);
  };

  useEffect(() => {
    setValue(title ?? '');
  }, [title]);
  return (
    <InputOrDisplayClient
      value={value}
      setValue={setValue}
      initValue={title ?? ''}
      action={handleUpdate}
      typo="h3"
      className="!text-lg md:!text-2xl"
      inputClassName="!py-6 !px-2"
      typoClassName="px-2 py-[9px]"
      id="title"
      placeholder={t('titlePlaceholder')}
    />
  );
}
