import PresentTemplate, { PresentTemplateProps } from '@/templates/Present.template';

export async function getPresent(): Promise<PresentTemplateProps> {
  const result = await fetch(`${process.env.API_SERVER_URL}/present`, { method: 'GET' });
  return result.json();
}

export default async function Page() {
  const present = await getPresent();
  return <PresentTemplate {...present} />;
}
