import Typography from '@/atoms/Typography';
import Container from '@/atoms/Container';
import { getTranslations } from 'next-intl/server';

export default async function PastSkeletonTemplate() {
  const t = await getTranslations('Past');
  return (
    <>
      <Typography.h4 className="absolute top-1 right-2">{t('skeletonTime')}</Typography.h4>
      <Container className="size-full justify-center items-center">
        <Typography.span className="text-foreground/70 h-full content-center">{t('skeletonLoading')}</Typography.span>
      </Container>
    </>
  );
}
