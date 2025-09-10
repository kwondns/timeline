import SignInTemplate from '@/templates/SignIn.template';
import SignInToastTemplateClient from '@/templates/SignInToast.template.client';
import { Suspense } from 'react';

export const revalidate = false;

export default async function Page() {
  return (
    <Suspense fallback={<SignInTemplate />}>
      <SignInToastTemplateClient>
        <SignInTemplate />
      </SignInToastTemplateClient>
    </Suspense>
  );
}
