import SignInTemplate from '@/templates/SignIn.template';
import SignInToastTemplate from '@/templates/SignInToast.template';
import { Suspense } from 'react';

export const revalidate = false;

export default async function Page() {
  return (
    <Suspense fallback={<SignInTemplate />}>
      <SignInToastTemplate>
        <SignInTemplate />
      </SignInToastTemplate>
    </Suspense>
  );
}
