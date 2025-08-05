'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { toggleCheckBoxAction } from '@/actions/toggleCheckBox.action';
import { useState } from 'react';
import { toast } from 'sonner';

type CheckBoxWithActionProps = {
  id: string;
  initState: boolean;
  category?: 'future' | 'box';
};

export default function CheckBoxWithAction(props: CheckBoxWithActionProps) {
  const { id, initState, category = 'future' } = props;
  const [checked, setChecked] = useState<boolean>(initState);
  const onToggle = async () => {
    setChecked((prev) => !prev);
    try {
      await toggleCheckBoxAction({ id, checked, category });
    } catch (e) {
      console.error(e);
      toast.error('업데이트에 실패하였습니다.');
      setChecked((prev) => !prev);
    }
  };
  return <Checkbox checked={checked} onCheckedChange={onToggle} />;
}
