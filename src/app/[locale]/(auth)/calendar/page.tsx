import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const current = new Date(new Date().getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 7);

  redirect(`/calendar/${current}`);
}
