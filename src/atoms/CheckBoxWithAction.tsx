'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { toggleCheckBoxAction } from '@/actions/toggleCheckBox.action';
import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

type CheckBoxWithActionProps = {
  id: string;
  initState: boolean;
  category?: 'future' | 'box';
};

export default function CheckBoxWithAction(props: CheckBoxWithActionProps) {
  const { id, initState, category = 'future' } = props;
  const [checked, setChecked] = useState<boolean>(initState);
  const t = useTranslations('Toast.Future');
  const onToggle = async () => {
    setChecked((prev) => !prev);
    try {
      await toggleCheckBoxAction({ id, checked: !checked, category });
    } catch (e) {
      toast.error(t('updateError'));
      setChecked((prev) => !prev);
    }
  };
  return <Checkbox className="cursor-pointer" checked={checked} onCheckedChange={onToggle} />;
}
