'use client';

import Container from '@/atoms/Container';
import ActionButtonGroup, { ActionButtonGroupProps } from '@/molecules/ActionButtonGroup';
import { Card } from '@/components/ui/card';
import Typography from '@/atoms/Typography';
import { calculateDateDiff } from '@/lib/date';
import Indicator from '@/molecules/Indicator';
import InputOrDisplay from '@/atoms/InputOrDisplay';

type PresentInfoProps = {
  title: string;
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
      <InputOrDisplay
        value={title}
        typo="h3"
        className="!text-2xl"
        inputClassName="!py-6 !px-2"
        typoClassName="px-2 py-[9px]"
        id="title"
        placeholder="제목입력"
      />
      <Container className="justify-between gap-6 items-center">
        <Typography.h2 className="!pb-0">{diff}</Typography.h2>
        <ActionButtonGroup onTempSave={onTempSave} onSave={onSave} />
      </Container>
    </Card>
  );
}
