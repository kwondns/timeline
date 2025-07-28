import { useRecoilValue } from 'recoil';

import { MobileSelector } from '@/stores/Layout.store';
import Header from '@/components/Header';
import CarouselContainer from '@/components/CarouselContainer';
import Chat from '@/components/Chat';

type LayoutProps = {
  children: React.ReactNode;
};
export default function LayoutTemplate(props: LayoutProps) {
  const { children } = props;
  const isMobile = useRecoilValue(MobileSelector);
  let mainHeight: string;
  if (isMobile === 'mobile') mainHeight = 'h-[calc(var(--vh)-128px)]';
  else mainHeight = 'h-[calc(var(--vh)-64px)]';
  return (
    <div className="flex max-h-screen flex-col overflow-hidden">
      <Header />
      <main className={mainHeight}>
        <CarouselContainer>{children}</CarouselContainer>
      </main>
      <Chat />
    </div>
  );
}
