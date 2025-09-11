import { cn } from '@/lib/utils';
import { ComponentPropsWithRef, forwardRef } from 'react';

type ContainerProps = ComponentPropsWithRef<'div'> & {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  className?: string;
};

const Container = forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
  const { children, direction = 'row', className = '', ...others } = props;
  return (
    <div className={cn(`flex ${direction === 'column' ? 'flex-col' : ''} ${className}`)} {...others} ref={ref}>
      {children}
    </div>
  );
});

export default Container;
