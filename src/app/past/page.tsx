import PastTemplate from '@/templates/Past.template';
import { PastActivityType } from '@/types/past.type';

export default async function Page() {
  const date = new Date().toISOString().slice(0, 10);
  const response = await fetch(`${process.env.API_SERVER_URL}/past/${date}`, {
    method: 'GET',
    next: { revalidate: 300 },
  });
  const activities = (await response.json()) as PastActivityType[];

  return <PastTemplate date={date} activities={activities} />;
}
