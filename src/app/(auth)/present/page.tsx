import PresentTemplate, { PresentTemplateProps } from '@/templates/Present.template';

export default async function Page() {
  const response = await fetch(`${process.env.API_SERVER_URL}/present`, { method: 'GET' });
  const present = (await response.json()) as PresentTemplateProps;
  return <PresentTemplate {...present} />;
}
