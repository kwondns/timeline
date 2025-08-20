import SplashTemplate from '@/templates/Splash.template';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page() {
  const cookieStore = await cookies();
  const splash = cookieStore.get('splash')?.value;
  if (splash === '1') redirect('/present');
  return <SplashTemplate />;
}
