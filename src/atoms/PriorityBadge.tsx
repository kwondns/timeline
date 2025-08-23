import { Badge } from '@/components/ui/badge';
import { getTranslations } from 'next-intl/server';
import generatePriorityBadgeContent from '@/lib/utils/generatePriorityBadgeContent';

type PriorityBadgeProps = {
  priority: 1 | 2 | 3;
  className?: string;
};
export default async function PriorityBadge(props: PriorityBadgeProps) {
  const { priority, className = '' } = props;

  const t = await getTranslations('Future');

  const { badgeContent, badgeColor } = generatePriorityBadgeContent(t as (key: string) => string, priority);

  return (
    <Badge className={className} variant={badgeColor}>
      {badgeContent}
    </Badge>
  );
}
