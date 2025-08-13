import { redirect } from 'next/navigation';

export default async function Page() {
  redirect(`/calendar/${new Date().toISOString().slice(0, 7)}`);
}
