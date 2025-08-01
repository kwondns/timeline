import Container from '@/atoms/Container';
import StatusBadge, { StatusBadgeProps } from '@/atoms/StatusBadge';

export type StatusBadgeGroupProps = {
  from: string;
  to: string;
  diff: string;
};
export default function StatusBadgeGroup(props: StatusBadgeGroupProps) {
  const STATUS: { type: StatusBadgeProps['status']; variant: 'rose' | 'info' | 'green' }[] = [
    { type: 'from', variant: 'rose' },
    { type: 'to', variant: 'info' },
    { type: 'diff', variant: 'green' },
  ];
  return (
    <Container className="gap-6">
      {STATUS.map((status) => (
        <StatusBadge
          className="flex-1 justify-between py-2"
          key={status.type}
          status={status.type}
          variant={status.variant}
        >
          {props[status.type]}
        </StatusBadge>
      ))}
    </Container>
  );
}
