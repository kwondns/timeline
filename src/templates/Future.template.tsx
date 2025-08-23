import Container from '@/atoms/Container';
import Typography from '@/atoms/Typography';
import NewFutureBoxDialog from '@/organisms/NewFutureBoxDialog';
import { getTranslations } from 'next-intl/server';

export type FutureTemplateProps = { children: React.ReactNode };
export default async function FutureTemplate(props: FutureTemplateProps) {
  const { children } = props;

  const t = await getTranslations('Future');

  return (
    <Container direction="column" className="gap-4 py-8 px-4">
      <Typography.h1 className="self-start">{t('title')}</Typography.h1>
      <Container className="justify-between">
        <Typography.h4 className="text-foreground/50 mb-4">{t('subTitle')}</Typography.h4>
        <NewFutureBoxDialog />
      </Container>
      <Container direction="column" className="gap-4">
        {children}
      </Container>
    </Container>
  );
}
