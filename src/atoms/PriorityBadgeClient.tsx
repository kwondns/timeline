'use client';

import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';
import generatePriorityBadgeContent from '@/lib/utils/generatePriorityBadgeContent';

type PriorityBadgeProps = {
  priority: 1 | 2 | 3;
  className?: string;
};
export default function PriorityBadgeClient(props: PriorityBadgeProps) {
  const { priority, className = '' } = props;

  const t = useTranslations('Future');

  const { badgeContent, badgeColor } = generatePriorityBadgeContent(t as (key: string) => string, priority);

  return (
    <Badge className={className} variant={badgeColor}>
      {badgeContent}
    </Badge>
  );
}
