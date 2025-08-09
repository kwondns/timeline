import Container from '@/atoms/Container';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { requestValidateEmailAction } from '@/actions/signUp.action';
import useAsyncAction from '@/hooks/useAsyncAction';
import { toast } from 'sonner';

type EmailFieldProps = {
  email: string;
  isValidated: boolean;
  onEmailChange: (v: string) => void;
  onSuccess: () => void;
};
export default function EmailField(props: EmailFieldProps) {
  const { email, isValidated, onEmailChange, onSuccess } = props;
  const { run, loading } = useAsyncAction(() => requestValidateEmailAction({ email }), {
    onSuccess: () => {
      toast.info('메일을 확인해주세요!');
      onSuccess();
    },
    onError: (e) => {
      toast.error(e.message);
    },
    loadingMessage: '메일 발송중...',
  });
  return (
    <Container className="items-bottom gap-2">
      <div className="grid gap-3 grow">
        <label htmlFor="email">Email</label>
        <Input
          onChange={(e) => onEmailChange(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') run();
          }}
          id="email"
          placeholder="Email 입력"
          required
          disabled={loading || isValidated}
        />
      </div>
      {!isValidated && (
        <Button className="self-end" variant="outline" onClick={run} disabled={loading || isValidated}>
          인증하기
        </Button>
      )}
    </Container>
  );
}
