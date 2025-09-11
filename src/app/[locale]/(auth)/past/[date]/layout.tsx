import PastTemplate from '@/templates/Past.template';
import PastSkeletonTemplate from '@/templates/Past.skeleton.template';
import { Suspense } from 'react';

export async function generateStaticParams() {
  const params: { date: string }[] = [];
  const today = new Date();
  // 과거 100일 SSG로 생성
  for (let i = 0; i <= 100; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    params.push({ date: d.toISOString().slice(0, 10) });
  }
  return params;
}

export default async function Layout({ children, params }: LayoutProps<'/[locale]/past/[date]'>) {
  const { date } = await params;

  return (
    <PastTemplate date={date}>
      <Suspense fallback={<PastSkeletonTemplate />}>{children}</Suspense>
    </PastTemplate>
  );
}
