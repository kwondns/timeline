import { Badge } from '@/components/ui/badge';

type PriorityBadgeProps = {
  priority: 1 | 2 | 3;
};
export default function PriorityBadge(props: PriorityBadgeProps) {
  const { priority } = props;
  let badgeContent: string;
  let badgeColor: 'rose' | 'info' | 'green';
  switch (priority) {
    case 1:
      badgeContent = '높음';
      badgeColor = 'rose';
      break;
    case 2:
      badgeContent = '중간';
      badgeColor = 'info';
      break;
    case 3:
      badgeContent = '낮음';
      badgeColor = 'green';
  }

  return <Badge variant={badgeColor}>{badgeContent}</Badge>;
}
