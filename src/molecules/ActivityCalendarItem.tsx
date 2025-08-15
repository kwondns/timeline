'use client';

import { useRouter } from 'next/navigation';
import { createPastLink, formattingDateDiff } from '@/lib/date';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Typography from '@/atoms/Typography';

type ActivityProps = {
  date: string;
  count: number;
};
export default function ActivityCalendarItem(props: ActivityProps) {
  const { date, count } = props;
  const route = useRouter();
  const onClickButton = () => {
    route.push(createPastLink(date));
  };

  let color: string;
  if (count === 0) {
    color = 'bg-gray-400';
  } else if (count < 120) {
    color = 'bg-green-300';
  } else if (count < 180) {
    color = 'bg-green-500';
  } else color = 'bg-green-700';
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" className={`cursor-pointer size-full rounded-lg ${color} `} onClick={onClickButton} />
      </TooltipTrigger>
      <TooltipContent>
        <Typography.span>{`${date ? new Date(date).toLocaleDateString() : ''} - ${count ? formattingDateDiff(count) : ''}`}</Typography.span>
      </TooltipContent>
    </Tooltip>
  );
}
