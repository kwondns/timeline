import { Badge } from '@/components/ui/badge';
import Typography from '@/atoms/Typography';

export type StatusBadgeProps = {
  status: 'from' | 'to' | 'diff';
  variant: 'rose' | 'info' | 'green';
  children: React.ReactNode;
  className?: string;
};

const StatusTypo = ({ status }: { status: StatusBadgeProps['status'] }) => {
  let typo;
  switch (status) {
    case 'from':
      typo = '시작시간';
      break;
    case 'to':
      typo = '종료시간';
      break;
    case 'diff':
      typo = '경과시간';
  }
  return <Typography.h4>{typo}</Typography.h4>;
};

export default function StatusBadge(props: StatusBadgeProps) {
  const { children, variant, status, className = '' } = props;
  return (
    <Badge variant={variant} className={className}>
      <StatusTypo status={status} />
      <Typography.h4>{children}</Typography.h4>
    </Badge>
  );
}
