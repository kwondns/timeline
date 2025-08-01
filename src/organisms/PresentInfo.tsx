import { Input } from '@/components/ui/input';
import StatusBadgeGroup, { StatusBadgeGroupProps } from '@/molecules/StatusBadgeGroup';
import Container from '@/atoms/Container';
import ActionButtonGroup, { ActionButtonGroupProps } from '@/molecules/ActionButtonGroup';
import KbdGroup from '@/molecules/KbdGroup';

type PresentInfoProps = StatusBadgeGroupProps & ActionButtonGroupProps;

export default function PresentInfo(props: PresentInfoProps) {
  const { from, to, diff, onSave, onTempSave } = props;
  return (
    <Container direction="column" className="gap-4">
      <Input className="!text-2xl !py-6" id="title" placeholder="제목입력" />
      <StatusBadgeGroup from={from} to={to} diff={diff} />
      <Container className="justify-end gap-6">
        <KbdGroup />
        <ActionButtonGroup onTempSave={onTempSave} onSave={onSave} />
      </Container>
    </Container>
  );
}
