import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

type ContainerProps = {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  className?: string;
};

const Container = forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
  const { children, direction = 'row', className = '' } = props;
  return (
    <div className={cn(`flex ${direction === 'column' ? 'flex-col' : ''} ${className}`)} ref={ref}>
      {children}
    </div>
  );
});

export default Container;
