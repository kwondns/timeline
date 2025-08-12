import Container from '@/atoms/Container';
import { Card } from '@/components/ui/card';
import { getUser } from '@/lib/dal/user';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { refresh } from '@/lib/dal/auth';
import { refreshSession } from '@/lib/session';

type LayoutProps = {
  children: React.ReactNode;
};
export default async function Layout(props: Readonly<LayoutProps>) {
  const { children } = props;
  const user = await getUser();
  if (user) redirect('/present');
  else {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh-token')?.value;
    if (refreshToken) {
      const result = await refresh(refreshToken);
      if (result) {
        await refreshSession(result);
        redirect('/present');
      }
    }
  }
  return (
    <Container direction="column" className="absolute inset-0 justify-center align-center gap-6">
      <Card className="w-xs sm:w-sm mx-auto">{children}</Card>
    </Container>
  );
}
