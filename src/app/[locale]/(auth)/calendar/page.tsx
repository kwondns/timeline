import { redirect } from '@/i18n/navigation';
import { Locale } from '@/i18n/routing';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const current = new Date(new Date().getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 7);

  redirect({ href: `/calendar/${current}`, locale });
}
