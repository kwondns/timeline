'use client';

import { useRouter, useSelectedLayoutSegments } from 'next/navigation';
import { useEffect } from 'react';

type AuthGuardProps = {
  children: React.ReactNode;
};
export default function AuthGuard(props: Readonly<AuthGuardProps>) {
  const { children } = props;
  const route = useRouter();
  const segment = useSelectedLayoutSegments();
  useEffect(() => {
    (async () => {
      const user = await fetch('/api/me', { method: 'GET', credentials: 'include' });
      if (!user) route.replace('/sign/in');
    })();
  }, [segment, route]);

  return <>{children}</>;
}
