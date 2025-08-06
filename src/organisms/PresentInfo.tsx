'use client';

import Container from '@/atoms/Container';
import ActionButtonGroup, { ActionButtonGroupProps } from '@/molecules/ActionButtonGroup';
import { Card } from '@/components/ui/card';
import Typography from '@/atoms/Typography';
import { calculateDateDiff } from '@/lib/date';
import Indicator from '@/molecules/Indicator';
import PresentInputOrDisplay from '@/molecules/PresentInputOrDisplay';

type PresentInfoProps = {
  title: string | null;
  from: Date | null;
} & ActionButtonGroupProps;

export default function PresentInfo(props: PresentInfoProps) {
  const { from, title, onSave, onTempSave } = props;
  const diff = calculateDateDiff(from ?? '');
  return (
    <Card className="gap-4 px-6 pt-6 bg-info-foreground/20 border-info/20">
      <Container className="justify-between items-center">
        <Indicator active={!!from} />
        <Typography.h4 className="text-primary/70">{from?.toLocaleString('ko-kr')}</Typography.h4>
      </Container>
      <PresentInputOrDisplay title={title} />
      <Container className="justify-between gap-6 items-center">
        {from ? <Typography.h2 className="!pb-0">{diff}</Typography.h2> : <div />}
        <ActionButtonGroup onTempSave={onTempSave} onSave={onSave} />
      </Container>
    </Card>
  );
}
