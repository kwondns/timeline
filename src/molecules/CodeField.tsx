import useAsyncAction from '@/hooks/useAsyncAction';
import { validateCodeAction } from '@/actions/signUp.action';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type CodeFieldProps = {
  email: string;
  code: string;
  onCodeChange: (v: string) => void;
  isValidated: boolean;
  onSuccess: () => void;
  onFailure: () => void;
};

export default function CodeField(props: CodeFieldProps) {
  const { email, code, onCodeChange, isValidated, onSuccess, onFailure } = props;
  const { run, loading } = useAsyncAction(() => validateCodeAction({ email, code }), {
    onSuccess: () => {
      toast.success('인증 완료!');
      onSuccess();
    },
    onError: (e) => {
      toast.error(e.message);
      onFailure();
    },
    loadingMessage: '인증번호 확인중...',
  });
  return (
    <>
      <div className={`grid gap-3 grow mt-6`}>
        <label htmlFor="code">인증번호</label>
        <Input
          onChange={(e) => onCodeChange(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') run();
          }}
          id="code"
          placeholder="인증번호 입력"
          required
          disabled={loading || isValidated}
        />
      </div>
      <Button className="self-end" variant="outline" onClick={run} disabled={loading || isValidated || !code}>
        확인
      </Button>
    </>
  );
}
