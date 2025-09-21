'use client';

import { useRouter } from '@/i18n/navigation';
import { useEffect } from 'react';

export default function PresentPrefetcher() {
  const router = useRouter();
  useEffect(() => {
    router.prefetch('/present');
  }, [router]);
  return null;
}
