'use client';

import { Icon } from '@/atoms/Icon';
import { Button } from '@/components/ui/button';
import { useLocale } from 'next-intl';
import { redirect } from '@/i18n/navigation';

type ControllerButtonClientProps = {
  controlType: 'before' | 'next' | 'reset';
  current: Date;
  className?: string;
};

const controlHref = {
  before: (current: Date) =>
    `/calendar/${new Date(current.getFullYear(), current.getMonth() - 1, 2).toISOString().slice(0, 7)}`,
  next: (current: Date) =>
    `/calendar/${new Date(current.getFullYear(), current.getMonth() + 1, 2).toISOString().slice(0, 7)}`,
  reset: (_current: Date) => `/calendar/${new Date().toISOString().slice(0, 7)}`,
};

export default function ControllerButtonClient(props: ControllerButtonClientProps) {
  const { controlType, current, className = '' } = props;
  const locale = useLocale();
  const onClick = () => redirect({ href: controlHref[controlType](current), locale });
  return (
    <Button size="sm" onClick={onClick} className={className}>
      {Icon[controlType] as React.ReactNode}
    </Button>
  );
}
