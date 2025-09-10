'use client';

import Container from '@/atoms/Container';
import { Button } from '@/components/ui/button';
import { usePresentActions } from '@/templates/Present.template.client';
import Typography from '@/atoms/Typography';
import { useTranslations } from 'next-intl';

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
export default function ActionButtonGroupClient(props: ActionButtonGroupProps) {
  const { isStarted } = props;
  const { onSave, onTempSave, onStart } = usePresentActions();
  const t = useTranslations('Present');
  return (
    <Container className="gap-2">
      {isStarted ? (
        <>
          <ActionButton isOutline onClick={onTempSave}>
            {t('tempSave')}
          </ActionButton>
          <ActionButton onClick={onSave}>{t('save')}</ActionButton>
        </>
      ) : (
        <ActionButton onClick={onStart}>{t('start')}</ActionButton>
      )}
    </Container>
  );
}
