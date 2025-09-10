import Container from '@/atoms/Container';
import Typography from '@/atoms/Typography';
import ControllerButtonClient from '@/molecules/ControllerButton.client';

type CalendarControllerProps = {
  current: Date;
};

export default function CalendarController(props: Readonly<CalendarControllerProps>) {
  const { current } = props;
  const today = new Date();
  return (
    <Container className="justify-center ">
      <Container className="gap-4 relative">
        <ControllerButtonClient controlType="before" current={current} />
        <Typography.h3>{`${current.getFullYear()}. ${current.getMonth() + 1}`}</Typography.h3>
        <ControllerButtonClient controlType="next" current={current} />
        {(current.getMonth() !== today.getMonth() || current.getFullYear() !== today.getFullYear()) && (
          <ControllerButtonClient controlType="reset" current={current} className="absolute left-[calc(100%_+_20px)]" />
        )}
      </Container>
    </Container>
  );
}
