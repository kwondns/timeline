import { CardContent, CardHeader } from '@/components/ui/card';
import Typography from '@/atoms/Typography';
import SignUpFormClient from '@/organisms/SignUpForm.client';
import { Button } from '@/components/ui/button';
import Container from '@/atoms/Container';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

export default async function SignUpTemplate() {
  const t = await getTranslations('SignUp');
  return (
    <>
      <CardHeader>
        <Container className="justify-between">
          <Typography.h3>{t('title')}</Typography.h3>
          <Button variant="ghost">
            <Link href={'/sign/in'}>{t('back')}</Link>
          </Button>
        </Container>
      </CardHeader>
      <CardContent>
        <SignUpFormClient />
      </CardContent>
    </>
  );
}
