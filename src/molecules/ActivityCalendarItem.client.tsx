'use client';

import { useRouter } from '@/i18n/navigation';
import { createPastLink, formattingDateDiff } from '@/lib/utils/date';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Typography from '@/atoms/Typography';
import { useLocale } from 'next-intl';

type ActivityProps = {
  date: string;
  count: number;
};
export default function ActivityCalendarItemClient(props: ActivityProps) {
  const { date, count } = props;
  const route = useRouter();
  const onClickButton = () => {
    route.push(createPastLink(date));
  };

  const locale = useLocale();

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
        <Typography.span>{`${date ? new Date(date).toLocaleDateString() : ''} - ${count ? formattingDateDiff(count, locale) : ''}`}</Typography.span>
      </TooltipContent>
    </Tooltip>
  );
}
