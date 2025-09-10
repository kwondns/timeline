'use client';

import useAsyncAction from '@/hooks/useAsyncAction';
import { validateCodeAction } from '@/actions/signUp.action';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

type CodeFieldProps = {
  email: string;
  code: string;
  onCodeChange: (v: string) => void;
  isValidated: boolean;
  onSuccess: () => void;
  onFailure: () => void;
};

export default function CodeFieldClient(props: CodeFieldProps) {
  const { email, code, onCodeChange, isValidated, onSuccess, onFailure } = props;
  const t = useTranslations();
  const { run, loading } = useAsyncAction(() => validateCodeAction({ email, code }), {
    onSuccess: () => {
      toast.success(t('Toast.SignUp.codeSuccessToast'));
      onSuccess();
    },
    onError: (e) => {
      toast.error(e.message);
      onFailure();
    },
    loadingMessage: t('Toast.SignUp.codeLoadingToast'),
  });
  return (
    <>
      <div className={`grid gap-3 grow mt-6`}>
        <label htmlFor="code">{t('SignUp.Code.code')}</label>
        <Input
          onChange={(e) => onCodeChange(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') run();
          }}
          id="code"
          placeholder={t('SignUp.Code.codePlaceholder')}
          required
          disabled={loading || isValidated}
        />
      </div>
      <Button className="self-end" variant="outline" onClick={run} disabled={loading || isValidated || !code}>
        {t('SignUp.Code.codeSubmit')}
      </Button>
    </>
  );
}
