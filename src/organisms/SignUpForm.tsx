'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { signUpAction } from '@/actions/signUp.action';
import Container from '@/atoms/Container';
import { toast } from 'sonner';
import { useRouter } from '@/i18n/navigation';
import CodeField from '@/molecules/CodeField';
import EmailField from '@/molecules/EmailField';
import NameField from '@/molecules/NameField';
import PasswordField from '@/molecules/PasswordField';
import useAsyncAction from '@/hooks/useAsyncAction';
import { FADEIN_HIDDEN, FADEIN_VIEW } from '@/constants/TRANSITION';
import { useTranslations } from 'next-intl';

const FieldContainer = ({
  trigger,
  children,
  className,
}: {
  trigger: boolean;
  children: React.ReactNode;
  className?: string;
}) => {
  const classNameFadeIn = trigger ? FADEIN_VIEW : FADEIN_HIDDEN;
  return (
    <Container className={`items-bottom gap-2 transition-all delay-200 ${className} ${classNameFadeIn}`}>
      {children}
    </Container>
  );
};

export default function SignUpForm() {
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [isEmailValidated, setIsEmailValidated] = useState<boolean>(false);

  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordConfirmError, setPasswordConfirmError] = useState<string | null>(null);
  const route = useRouter();

  const t = useTranslations();

  const { run, loading } = useAsyncAction(() => signUpAction({ email, password, passwordConfirm, name }), {
    onSuccess: () => {
      toast.success(t('Toast.SignUp.signUpSuccessToast'));
      route.replace('/sign/in');
    },
    onError: (e) => {
      toast.error(e.message);
    },
    onValidateError: (e) => {
      if (e?.password) setPasswordError(e.password.errors[0]);
      else setPasswordError(null);
      if (e?.passwordConfirm) setPasswordConfirmError(e.passwordConfirm.errors[0]);
      else setPasswordConfirmError(null);
    },
    loadingMessage: t('Toast.SignUp.signUpLoadingToast'),
  });
  return (
    <Container direction="column">
      <EmailField
        email={email}
        isValidated={isValidated}
        onEmailChange={setEmail}
        onSuccess={() => {
          setIsEmailValidated(true);
        }}
      />
      <FieldContainer trigger={isEmailValidated}>
        <CodeField
          email={email}
          code={code}
          onCodeChange={setCode}
          isValidated={isValidated}
          onSuccess={() => setIsValidated(true)}
          onFailure={() => setIsEmailValidated(false)}
        />
      </FieldContainer>
      <FieldContainer trigger={isValidated}>
        <Container direction="column" className="mt-6 w-full">
          <PasswordField
            onChangePassword={setPassword}
            onChangePasswordConfirm={setPasswordConfirm}
            passwordError={passwordError}
            passwordConfirmError={passwordConfirmError}
          />
          <NameField onChange={setName} action={run} />
        </Container>
      </FieldContainer>
      <FieldContainer trigger={isValidated} className="mt-6">
        <Button
          type="button"
          className="w-full"
          onClick={run}
          disabled={!isEmailValidated || !password || !passwordConfirm || !name || !isValidated || loading}
        >
          {t('SignUp.signUpSubmit')}
        </Button>
      </FieldContainer>
    </Container>
  );
}
