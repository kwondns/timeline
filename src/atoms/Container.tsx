import { cn } from '@/lib/utils';

type ContainerProps = {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  className?: string;
};

export default function Container(props: ContainerProps) {
  const { children, direction = 'row', className = '' } = props;
  return <div className={cn(`flex ${direction === 'column' ? 'flex-col' : ''} ${className}`)}>{children}</div>;
}
