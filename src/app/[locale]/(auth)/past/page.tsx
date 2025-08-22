import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const date = new Date(new Date().getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
  redirect(`/past/${date}`);
}
