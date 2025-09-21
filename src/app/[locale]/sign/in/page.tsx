import SignInTemplate from '@/templates/SignIn.template';
import SignInToastTemplateClient from '@/templates/SignInToast.template.client';
import { Suspense } from 'react';
import PresentPrefetcher from '@/app/[locale]/sign/in/PresentPrefetcher';

export const revalidate = false;

export default async function Page() {
  return (
    <Suspense fallback={<SignInTemplate />}>
      <SignInToastTemplateClient>
        <SignInTemplate />
      </SignInToastTemplateClient>
      <PresentPrefetcher />
    </Suspense>
  );
}
