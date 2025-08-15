'use client';

import signInAction from '@/actions/signIn.action';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useAsyncAction from '@/hooks/useAsyncAction';
import { toast } from 'sonner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputError from '@/molecules/InputError';

export default function SignInForm() {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const route = useRouter();

  const { run, loading } = useAsyncAction(() => signInAction({ email, password }), {
    onSuccess: () => {
      toast.success('인증 완료!');
      route.replace('/present');
    },
    onError: (e) => {
      toast.error('인증 실패!');
    },
    onValidateError: (e) => {
      if (e?.email) setEmailError(e.email.errors[0]);
      else setEmailError(null);
      if (e?.password) setPasswordError(e.password.errors[0]);
      else setPasswordError(null);
    },
    loadingMessage: '인증중...',
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-3">
        <label htmlFor="id">ID</label>
        <Input
          id="email"
          placeholder="Email 입력"
          onChange={(e) => setEmail(e.currentTarget.value)}
          disabled={loading}
          required
        />
        <InputError value={emailError} />
      </div>
      <div className="grid gap-3">
        <div className="flex items-center">
          <label htmlFor="password">Password</label>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="Password 입력"
          onChange={(e) => setPassword(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') run();
          }}
          disabled={loading}
          required
        />
        <InputError value={passwordError} />
      </div>
      <div className="flex flex-col gap-3">
        <Button type="button" onClick={run} disabled={loading} className="w-full">
          인증하기
        </Button>
      </div>
    </div>
  );
}
