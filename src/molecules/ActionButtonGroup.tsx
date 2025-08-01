import Container from '@/atoms/Container';
import { Button } from '@/components/ui/button';

export type ActionButtonGroupProps = {
  onTempSave: () => void;
  onSave: () => void;
};
export default function ActionButtonGroup(props: ActionButtonGroupProps) {
  const { onTempSave, onSave } = props;
  return (
    <Container className="gap-2">
      <Button variant="outline" onClick={onTempSave}>
        임시 저장
      </Button>
      <Button onClick={onSave}>저장</Button>
    </Container>
  );
}
