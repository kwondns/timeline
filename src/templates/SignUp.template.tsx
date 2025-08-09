import { CardContent, CardHeader } from '@/components/ui/card';
import Typography from '@/atoms/Typography';
import SignUpForm from '@/organisms/SignUpForm';
import { Button } from '@/components/ui/button';
import Container from '@/atoms/Container';
import Link from 'next/link';

export default function SignUpTemplate() {
  return (
    <>
      <CardHeader>
        <Container className="justify-between">
          <Typography.h3>회원가입</Typography.h3>
          <Button variant="ghost">
            <Link href={'/sign/in'}>돌아가기</Link>
          </Button>
        </Container>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </>
  );
}
