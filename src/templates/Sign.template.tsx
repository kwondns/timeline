import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FormWrapper from '@/molecules/FormWrapper';
import signInAction from '@/actions/signIn.action';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Typography from '@/atoms/Typography';
import Container from '@/atoms/Container';

export default function SignTemplate() {
  return (
    <Container direction="column" className="absolute inset-0 justify-center align-center gap-6">
      <Card className="w-xs sm:w-sm mx-auto">
        <CardHeader>
          <Typography.h3>로그인</Typography.h3>
        </CardHeader>
        <CardContent>
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
                  Login
                </Button>
              </div>
            </div>
          </FormWrapper>
        </CardContent>
      </Card>
    </Container>
  );
}
