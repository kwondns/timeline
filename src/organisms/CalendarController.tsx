'use client';

import Container from '@/atoms/Container';
import Typography from '@/atoms/Typography';
import { Icon, IconType } from '@/atoms/Icon';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';

type CalendarControllerProps = {
  current: Date;
};

const ControllerButton = ({ icon, onClick }: { icon: IconType; onClick: () => void }) => (
  <Button size="sm" onClick={onClick}>
    {Icon[icon] as React.ReactNode}
  </Button>
);

export default function CalendarController(props: CalendarControllerProps) {
  const { current } = props;
  const today = new Date();
  const onClickPrevMonth = () => {
    redirect(`/calendar/${new Date(current.getFullYear(), current.getMonth() - 1, 2).toISOString().slice(0, 7)}`);
  };
  const onClickNextMonth = () => {
    redirect(`/calendar/${new Date(current.getFullYear(), current.getMonth() + 1, 2).toISOString().slice(0, 7)}`);
  };

  const onClickResetMonth = () => {
    redirect(`/calendar`);
  };
  return (
    <Container className="justify-center gap-4">
      <ControllerButton icon="before" onClick={onClickPrevMonth} />
      <Typography.h3>{`${current.getFullYear()}. ${current.getMonth() + 1}`}</Typography.h3>
      <ControllerButton icon="next" onClick={onClickNextMonth} />
      {(current.getMonth() !== today.getMonth() || current.getFullYear() !== today.getFullYear()) && (
        <ControllerButton icon="reset" onClick={onClickResetMonth} />
      )}
    </Container>
  );
}
