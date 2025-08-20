'use client';

import useAsyncAction from '@/hooks/useAsyncAction';
import { toast } from 'sonner';
import signInToDemoAction from '@/actions/signInToDemo.action';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function DemoButton() {
  const route = useRouter();
  const { run, loading } = useAsyncAction(() => signInToDemoAction(), {
    onSuccess: () => {
      toast.success('데모 계정으로 인증 완료!');
      route.replace('/present');
    },
    onError: (e) => {
      toast.error(e.message);
    },
    loadingMessage: '데모 계정 확인중...',
  });

  return (
    <Button className="mt-6 w-full" variant="ghost" disabled={loading} onClick={run}>
      데모버전
    </Button>
  );
}
