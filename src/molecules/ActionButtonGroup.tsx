'use client';

import Container from '@/atoms/Container';
import { Button } from '@/components/ui/button';
import { usePresentActions } from '@/templates/PresentClient.template';
import Typography from '@/atoms/Typography';

export type ActionButtonGroupProps = {
  isStarted: boolean;
};

const ActionButton = ({
  children,
  onClick,
  isOutline = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  isOutline?: boolean;
}) => {
  return (
    <Button className="py-3 md:py-5" variant={isOutline ? 'outline' : 'default'} onClick={onClick}>
      <Typography.h4>{children}</Typography.h4>
    </Button>
  );
};
export default function ActionButtonGroup(props: ActionButtonGroupProps) {
  const { isStarted } = props;
  const { onSave, onTempSave, onStart } = usePresentActions();

  return (
    <Container className="gap-2">
      {isStarted ? (
        <>
          <ActionButton isOutline onClick={onTempSave}>
            임시 저장
          </ActionButton>
          <ActionButton onClick={onSave}>종료</ActionButton>
        </>
      ) : (
        <ActionButton onClick={onStart}>시작하기</ActionButton>
      )}
    </Container>
  );
}
