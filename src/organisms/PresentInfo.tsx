'use client';

import { Input } from '@/components/ui/input';
import Container from '@/atoms/Container';
import ActionButtonGroup, { ActionButtonGroupProps } from '@/molecules/ActionButtonGroup';
import { Card } from '@/components/ui/card';
import Typography from '@/atoms/Typography';
import { calculateDateDiff } from '@/lib/date';
import Indicator from '@/molecules/Indicator';

type PresentInfoProps = {
  from: Date | null;
} & ActionButtonGroupProps;

export default function PresentInfo(props: PresentInfoProps) {
  const { from, onSave, onTempSave } = props;
  const diff = calculateDateDiff(from ?? '');
  return (
    <Card className="gap-4 px-6 pt-6 bg-info-foreground/20 border-info/20">
      <Container className="justify-between items-center">
        <Indicator active={!!from} />
        <Typography.h4 className="text-primary/70">{from?.toLocaleString('ko-kr')}</Typography.h4>
      </Container>
      {/* TODO 기본 Typo, 더블클릭 시 Input으로 변경 */}
      <Input className="!text-2xl !py-6" id="title" placeholder="제목입력" />
      <Container className="justify-between gap-6 items-center">
        <Typography.h2 className="!pb-0">{diff}</Typography.h2>
        <ActionButtonGroup onTempSave={onTempSave} onSave={onSave} />
      </Container>
    </Card>
  );
}
