import PastTemplate from '@/templates/Past.template';
import { PastActivityType } from '@/types/past.type';
import { callGetWithAuth } from '@/lib/dal/http';

export default async function Page() {
  const date = new Date().toISOString().slice(0, 10);
  const activities = await callGetWithAuth<PastActivityType[]>(`/past/${date}`);

  return <PastTemplate date={date} activities={activities} />;
}
