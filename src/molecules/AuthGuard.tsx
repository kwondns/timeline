'use client';

import { useRouter, useSelectedLayoutSegments } from 'next/navigation';
import { useEffect } from 'react';
import { getUser } from '@/lib/dal/user';

type AuthGuardProps = {
  children: React.ReactNode;
};
export default function AuthGuard(props: Readonly<AuthGuardProps>) {
  const { children } = props;
  const route = useRouter();
  const segment = useSelectedLayoutSegments();
  useEffect(() => {
    (async () => {
      const session = await getUser();
      if (!session) {
        const res = await fetch('/api/refresh', { method: 'POST', credentials: 'include' });
        if (res.status === 401) {
          route.replace('/sign/in');
        }
      }
    })();
  }, [segment, route]);

  return <>{children}</>;
}
