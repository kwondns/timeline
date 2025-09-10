import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Typography from '@/atoms/Typography';
import FutureContent, { FutureContentProps } from '@/molecules/FutureContent';
import Container from '@/atoms/Container';
import CheckBoxWithActionClient from '@/atoms/CheckBoxWithAction.client';
import NewFutureDialog from '@/organisms/NewFutureDialog';
import FutureInputOrDisplayClient from '@/molecules/FutureInputOrDisplay.client';
import { getTranslations } from 'next-intl/server';

export type FutureBoxCardProps = {
  title: string;
  id: string;
  checked: boolean;
  order: number;
  type: 'check' | 'progress';
  futures: FutureContentProps[];
};

export default async function FutureBoxCard(props: FutureBoxCardProps) {
  const { title, id, checked, type, futures } = props;
  const t = await getTranslations('Future');
  return (
    <Card className="p-6 max-h-[450px]" id={id}>
      <CardHeader>
        <Container className="justify-between">
          <FutureInputOrDisplayClient id={id} value={title} category="box" />
          <Container className="items-center gap-2">
            <NewFutureDialog boxId={id} type={type} />
            <CheckBoxWithActionClient id={id} initState={checked} category="box" />
          </Container>
        </Container>
      </CardHeader>
      <CardContent className="overflow-x-auto grid md:grid-cols-[repeat(auto-fit,_minmax(300px,1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(450px,1fr))] gap-4 p-4">
        {futures.map((future) => (
          <FutureContent key={future.id} {...future} />
        ))}
        {futures.length < 1 && <Typography.h4 className="pl-2">{t('noFuture')}</Typography.h4>}
      </CardContent>
    </Card>
  );
}
