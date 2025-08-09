import { Button } from '@/components/ui/button';
import { CardContent, CardHeader } from '@/components/ui/card';
import Typography from '@/atoms/Typography';
import SignInForm from '@/organisms/SignInForm';
import Link from 'next/link';

export default function SignInTemplate() {
  return (
    <>
      <CardHeader>
        <Typography.h3>로그인</Typography.h3>
      </CardHeader>
      <CardContent>
        <SignInForm />
        <Button className="mt-1 w-full" variant="outline">
          <Link href={'/sign/up'}>가입하기</Link>
        </Button>
        <Button className="mt-4 w-full" variant="ghost">
          데모버전
        </Button>
      </CardContent>
    </>
  );
}
