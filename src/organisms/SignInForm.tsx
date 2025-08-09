import FormWrapper from '@/molecules/FormWrapper';
import signInAction from '@/actions/signIn.action';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SignInForm() {
  return (
    <FormWrapper serverAction={signInAction} type="sign">
      <div className="flex flex-col gap-6">
        <div className="grid gap-3">
          <label htmlFor="id">ID</label>
          <Input id="id" placeholder="ID 입력" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <label htmlFor="password">Password</label>
          </div>
          <Input id="password" type="password" placeholder="PassWord 입력" required />
        </div>
        <div className="flex flex-col gap-3">
          <Button type="submit" className="w-full">
            인증하기
          </Button>
        </div>
      </div>
    </FormWrapper>
  );
}
