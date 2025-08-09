'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { signUpAction } from '@/actions/signUp.action';
import Container from '@/atoms/Container';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import CodeField from '@/molecules/CodeField';
import EmailField from '@/molecules/EmailField';
import NameField from '@/molecules/NameField';
import PasswordField from '@/molecules/PasswordField';
import useAsyncAction from '@/hooks/useAsyncAction';

const FieldContainer = ({ className, children }: { className: string; children: React.ReactNode }) => (
  <Container className={`items-bottom gap-2 transition-all delay-200 ${className} `}>{children} </Container>
);

export default function SignUpForm() {
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [isEmailValidated, setIsEmailValidated] = useState<boolean>(false);

  const route = useRouter();

  const VIEW = 'max-h-[400px] opacity-100';
  const HIDDEN = 'max-h-0 overflow-hidden opacity-0';

  const isEmailValidatedClass = isEmailValidated ? VIEW : HIDDEN;
  const isCodeValidatedClass = isValidated ? VIEW : HIDDEN;
  const { run, loading } = useAsyncAction(() => signUpAction({ email, password, passwordConfirm, name }), {
    onSuccess: () => {
      toast.success('가입 완료!');
      route.replace('/sign/in');
    },
    onError: (e) => {
      toast.error(e.message);
    },
    loadingMessage: '가입 처리중...',
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
      <FieldContainer className={isEmailValidatedClass}>
        <CodeField
          email={email}
          code={code}
          onCodeChange={setCode}
          isValidated={isValidated}
          onSuccess={() => setIsValidated(true)}
          onFailure={() => setIsEmailValidated(false)}
        />
      </FieldContainer>
      <FieldContainer className={isCodeValidatedClass}>
        <Container direction="column" className="mt-6 w-full">
          <PasswordField onChangePassword={setPassword} onChangePasswordConfirm={setPasswordConfirm} />
          <NameField onChange={setName} action={run} />
        </Container>
      </FieldContainer>
      <FieldContainer className={`mt-6 ${isCodeValidatedClass}`}>
        <Button
          type="button"
          className="w-full"
          onClick={run}
          disabled={!isEmailValidated || !password || !passwordConfirm || !name || !isValidated || loading}
        >
          가입하기
        </Button>
      </FieldContainer>
    </Container>
  );
}
