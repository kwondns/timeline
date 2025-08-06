'use client';

import { Slider } from '@/components/ui/slider';
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { savePercentageAction } from '@/actions/savePercentage.action';
import { toast } from 'sonner';

type SliderWithActionProps = {
  id: string;
  percentage: number;
};

const DEBOUNCE_TIME = 700;
export default function SliderWithAction(props: SliderWithActionProps) {
  const { id, percentage } = props;
  const [currentPercentage, setCurrentPercentage] = useState<number>(percentage);
  const debouncedPercentage = useDebounce(currentPercentage, DEBOUNCE_TIME);
  const [rendered, setRendered] = useState<boolean>(false);
  const callAction = async (percentage: number) => {
    const loadingToast = toast.loading('수정중...');
    try {
      await savePercentageAction({ id, percentage });
      toast.dismiss(loadingToast);
      toast.success('수정 완료!');
    } catch (e) {
      toast.dismiss(loadingToast);
      toast.error('수정 실패!');
    }
  };

  useEffect(() => setRendered(true), []);
  useEffect(() => {
    // oxlint-disable-next-line exhaustive-deps
    if (rendered && debouncedPercentage === currentPercentage) callAction(debouncedPercentage);
  }, [debouncedPercentage, currentPercentage]);
  const onChange = (value: number[]) => {
    setCurrentPercentage(value[0]);
  };
  return <Slider onValueChange={onChange} value={[currentPercentage]} min={0} max={100} />;
}
