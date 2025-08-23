'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

type SignInToastTemplateProps = {
  children: React.ReactNode;
};
export default function SignInToastTemplate(props: SignInToastTemplateProps) {
  const t = useTranslations('Toast.Auth');
  const { children } = props;
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('toast') === 'loginRequired') toast.error(t('loginRequiredToast'));
  }, [searchParams, t]);
  return <>{children}</>;
}
