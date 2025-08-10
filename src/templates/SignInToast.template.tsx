'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

type SignInToastTemplateProps = {
  children: React.ReactNode;
  needToast: boolean;
};
export default function SignInToastTemplate(props: SignInToastTemplateProps) {
  const { children, needToast } = props;
  useEffect(() => {
    if (needToast) toast.error('로그인이 필요합니다!');
  }, [needToast]);
  return <>{children}</>;
}
