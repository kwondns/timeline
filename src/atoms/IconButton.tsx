import { IconType } from '@/constants/ICON';
import { Button, buttonVariants } from '@/components/ui/button';
import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import Icon from '@/atoms/Icon';

type IconButtonProps = {
  icon: IconType;
  children?: React.ReactNode;
  asChild?: boolean;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  iconSize?: number;
} & React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>;

export default function IconButton(props: IconButtonProps) {
  const { children, icon, direction = 'row', className, iconSize = 28, ...others } = props;
  const flexDirection = `flex-${direction}`;
  return (
    <Button className={`${flexDirection} ${className}`} {...others}>
      {<Icon name={icon} size={iconSize} />}
      {children}
    </Button>
  );
}
