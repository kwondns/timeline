import { redirect } from 'next/navigation';

export default async function Page() {
  const date = new Date().toISOString().slice(0, 10);
  redirect(`/past/${date}`);
}
