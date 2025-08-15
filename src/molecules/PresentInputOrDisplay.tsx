'use client';

import InputOrDisplay from '@/atoms/InputOrDisplay';
import { useEffect, useState } from 'react';
import { callActionWithToast } from '@/lib/action';
import { updatePresentTitleAction } from '@/actions/updatePresent';

type PresentInputOrDisplayProps = {
  title: string | null;
};
export default function PresentInputOrDisplay(props: PresentInputOrDisplayProps) {
  const { title } = props;
  const [value, setValue] = useState(title ?? '');
  const handleUpdate = async () => {
    if (value === title) return;
    await callActionWithToast(() => updatePresentTitleAction(value));
  };

  useEffect(() => {
    setValue(title ?? '');
  }, [title]);
  return (
    <InputOrDisplay
      value={value}
      setValue={setValue}
      initValue={title ?? ''}
      action={handleUpdate}
      typo="h3"
      className="!text-lg md:!text-2xl"
      inputClassName="!py-6 !px-2"
      typoClassName="px-2 py-[9px]"
      id="title"
      placeholder="제목입력"
    />
  );
}
