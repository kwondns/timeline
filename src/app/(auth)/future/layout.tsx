import FutureTemplate from '@/templates/Future.template';
import { Suspense } from 'react';
import { Card } from '@/components/ui/card';
import Typography from '@/atoms/Typography';

type LayoutProps = {
  children: React.ReactNode;
};

export const revalidate = false;

export default function Layout(props: LayoutProps) {
  const { children } = props;
  return (
    <FutureTemplate>
      <Suspense
        fallback={
          <Card className="p-6 max-h-[450px]">
            <Typography.span>로딩중...</Typography.span>
          </Card>
        }
      >
        {children}
      </Suspense>
    </FutureTemplate>
  );
}
