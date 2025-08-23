'use client';

import useAsyncAction from '@/hooks/useAsyncAction';
import { toast } from 'sonner';
import signInToDemoAction from '@/actions/signInToDemo.action';
import { useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function DemoButton() {
  const route = useRouter();
  const t = useTranslations();
  const { run, loading } = useAsyncAction(() => signInToDemoAction(), {
    onSuccess: () => {
      toast.success(t('Toast.Auth.demoAuthSuccessToast'));
      route.replace('/present');
    },
    onError: (e) => {
      toast.error(e.message);
    },
    loadingMessage: t('Toast.Auth.demoAuthLoadingToast'),
  });

  return (
    <Button className="mt-6 w-full" variant="ghost" disabled={loading} onClick={run}>
      {t('Auth.demo')}
    </Button>
  );
}
