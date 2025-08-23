import Container from '@/atoms/Container';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { requestValidateEmailAction } from '@/actions/signUp.action';
import useAsyncAction from '@/hooks/useAsyncAction';
import { toast } from 'sonner';
import { useState } from 'react';
import InputError from '@/molecules/InputError';
import { useTranslations } from 'next-intl';

type EmailFieldProps = {
  email: string;
  isValidated: boolean;
  onEmailChange: (v: string) => void;
  onSuccess: () => void;
};
export default function EmailField(props: Readonly<EmailFieldProps>) {
  const { email, isValidated, onEmailChange, onSuccess } = props;
  const [emailError, setEmailError] = useState<string | null>(null);
  const t = useTranslations();
  const { run, loading } = useAsyncAction(() => requestValidateEmailAction({ email }), {
    onSuccess: () => {
      toast.info(t('Toast.SignUp.emailSuccessToast'));
      onSuccess();
    },
    onError: (e) => {
      toast.error(e.message);
    },
    onValidateError: (e) => {
      if (e?.email) setEmailError(e.email.errors[0]);
      else setEmailError(null);
    },
    loadingMessage: t('Toast.SignUp.emailLoadingToast'),
  });
  return (
    <>
      <Container className="items-bottom gap-2">
        <div className="grid gap-3 grow">
          <label htmlFor="email">Email</label>
          <Input
            onChange={(e) => onEmailChange(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') run();
            }}
            id="email"
            placeholder={t('SignUp.Email.emailPlaceholder')}
            required
            disabled={loading || isValidated}
          />
        </div>
        {!isValidated && (
          <Button className="self-end" variant="outline" onClick={run} disabled={loading || isValidated}>
            {t('SignUp.Email.emailSubmit')}
          </Button>
        )}
      </Container>
      <InputError value={emailError} />
    </>
  );
}
