import SignInTemplate from '@/templates/SignIn.template';
import SignInToastTemplate from '@/templates/SignInToast.template';

export default async function Page({ searchParams }: Readonly<{ searchParams: Promise<{ toast?: string }> }>) {
  const { toast } = await searchParams;
  return (
    <SignInToastTemplate needToast={toast === 'loginRequired'}>
      <SignInTemplate />
    </SignInToastTemplate>
  );
}
