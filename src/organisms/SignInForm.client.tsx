'use client';

import signInAction from '@/actions/signIn.action';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useAsyncAction from '@/hooks/useAsyncAction';
import { toast } from 'sonner';
import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import InputError from '@/molecules/InputError';
import { useTranslations } from 'next-intl';

export default function SignInFormClient() {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const route = useRouter();
  const t = useTranslations();

  const { run, loading } = useAsyncAction(() => signInAction({ email, password }), {
    onSuccess: () => {
      toast.success(t('Toast.Auth.authSuccessToast'));
      route.replace('/present');
    },
    onError: (e) => {
      toast.error(t('Toast.Auth.authErrorToast'));
    },
    onValidateError: (e) => {
      if (e?.email) setEmailError(e.email.errors[0]);
      else setEmailError(null);
      if (e?.password) setPasswordError(e.password.errors[0]);
      else setPasswordError(null);
    },
    loadingMessage: t('Toast.Auth.authLoadingToast'),
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-3">
        <label htmlFor="id">ID</label>
        <Input
          id="email"
          placeholder={t('SignUp.Email.emailPlaceholder')}
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
          placeholder={t('SignUp.Password.passwordPlaceholder')}
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
          {t('Auth.signIn')}
        </Button>
      </div>
    </div>
  );
}
