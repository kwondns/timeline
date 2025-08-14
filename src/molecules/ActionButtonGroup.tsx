'use client';

import Container from '@/atoms/Container';
import { Button } from '@/components/ui/button';
import { usePresentActions } from '@/templates/PresentClient.template';

export type ActionButtonGroupProps = {
  isStarted: boolean;
};

export default function ActionButtonGroup(props: ActionButtonGroupProps) {
  const { isStarted } = props;
  const { onSave, onTempSave, onStart } = usePresentActions();

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
        <Button className="text-xl py-5" onClick={onStart}>
          시작하기
        </Button>
      )}
    </Container>
  );
}
