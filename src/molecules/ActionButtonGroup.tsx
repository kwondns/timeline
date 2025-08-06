import Container from '@/atoms/Container';
import { Button } from '@/components/ui/button';
import { updatePresentStartAction } from '@/actions/updatePresent';

export type ActionButtonGroupProps = {
  onTempSave: () => void;
  onSave: () => void;
  isStarted: boolean;
};

export default function ActionButtonGroup(props: ActionButtonGroupProps) {
  const { onTempSave, onSave, isStarted } = props;
  return (
    <Container className="gap-2">
      {isStarted ? (
        <>
          <Button className="text-xl py-5" variant="outline" onClick={onTempSave}>
            임시 저장
          </Button>
          <Button className="text-xl py-5" onClick={onSave}>
            종료
          </Button>
        </>
      ) : (
        <form action={updatePresentStartAction}>
          <Button type="submit" className="text-xl py-5">
            시작하기
          </Button>
        </form>
      )}
    </Container>
  );
}
