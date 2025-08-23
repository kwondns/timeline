import { Card } from '@/components/ui/card';
import Typography from '@/atoms/Typography';
import { getTranslations } from 'next-intl/server';

export default async function NoFutureBoxTemplate() {
  const t = await getTranslations('Future');
  return (
    <Card className="p-6 max-h-[450px]">
      <Typography.span>{t('noFutureBox')}</Typography.span>
    </Card>
  );
}
