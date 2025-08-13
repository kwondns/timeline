'use client';

import Container from '@/atoms/Container';
import Typography from '@/atoms/Typography';
import { Icon, IconType } from '@/atoms/Icon';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';

type CalendarControllerProps = {
  current: Date;
};

const ControllerButton = ({
  icon,
  onClick,
  className = '',
}: {
  icon: IconType;
  onClick: () => void;
  className?: string;
}) => (
  <Button size="sm" onClick={onClick} className={className}>
    {Icon[icon] as React.ReactNode}
  </Button>
);

export default function CalendarController(props: Readonly<CalendarControllerProps>) {
  const { current } = props;
  const today = new Date();
  const onClickPrevMonth = () => {
    redirect(`/calendar/${new Date(current.getFullYear(), current.getMonth() - 1, 2).toISOString().slice(0, 7)}`);
  };
  const onClickNextMonth = () => {
    redirect(`/calendar/${new Date(current.getFullYear(), current.getMonth() + 1, 2).toISOString().slice(0, 7)}`);
  };

  const onClickResetMonth = () => {
    redirect(`/calendar/${new Date().toISOString().slice(0, 7)}`);
  };
  return (
    <Container className="justify-center ">
      <Container className="gap-4 relative">
        <ControllerButton icon="before" onClick={onClickPrevMonth} />
        <Typography.h3>{`${current.getFullYear()}. ${current.getMonth() + 1}`}</Typography.h3>
        <ControllerButton icon="next" onClick={onClickNextMonth} />
        {(current.getMonth() !== today.getMonth() || current.getFullYear() !== today.getFullYear()) && (
          <ControllerButton className="absolute left-[calc(100%_+_20px)]" icon="reset" onClick={onClickResetMonth} />
        )}
      </Container>
    </Container>
  );
}
