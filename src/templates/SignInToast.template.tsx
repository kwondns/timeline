'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';

type SignInToastTemplateProps = {
  children: React.ReactNode;
};
export default function SignInToastTemplate(props: SignInToastTemplateProps) {
  const { children } = props;
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('toast') === 'loginRequired') toast.error('로그인이 필요합니다!');
  }, [searchParams]);
  return <>{children}</>;
}
