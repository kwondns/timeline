import FutureBoxCard, { FutureBoxCardProps } from '@/organisms/FutureBoxCard';
import { callGetWithAuth } from '@/lib/dal/http';
import NoFutureBoxTemplate from '@/templates/NoFutureBox.template';
import { Locale } from '@/i18n/routing';
import { FUTURE_METADATA } from '@/constants/METADATA';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: FUTURE_METADATA.title[locale],
    description: FUTURE_METADATA.description[locale],
  };
}
export default async function Page() {
  const futureBoxes = await callGetWithAuth<FutureBoxCardProps[]>('/future', {
    next: { revalidate: false },
    tag: 'future',
  });
  return futureBoxes.length > 0 ? (
    futureBoxes.map((futureBox) => <FutureBoxCard key={futureBox.id} {...futureBox} />)
  ) : (
    <NoFutureBoxTemplate />
  );
}
