import { Button } from '@/components/ui/button';
import { CardContent, CardHeader } from '@/components/ui/card';
import Typography from '@/atoms/Typography';
import SignInForm from '@/organisms/SignInForm';
import DemoButton from '@/molecules/DemoButton';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

export default async function SignInTemplate() {
  const t = await getTranslations('Auth');
  return (
    <>
      <CardHeader>
        <Typography.h3>{t('signIn')}</Typography.h3>
      </CardHeader>
      <CardContent>
        <SignInForm />
        <Button className="mt-2 w-full" variant="outline">
          <Link href={'/sign/up'}>{t('signUp')}</Link>
        </Button>
        <DemoButton />
      </CardContent>
    </>
  );
}
