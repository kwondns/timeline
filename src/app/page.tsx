import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function Page() {
  const locale = (await cookies()).get('NEXT_LOCALE')?.value ?? 'ko';
  redirect(`/${locale}`);
}
