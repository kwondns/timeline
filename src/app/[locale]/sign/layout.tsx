import Container from '@/atoms/Container';
import { Card } from '@/components/ui/card';
import SignSelectLanguage from '@/organisms/SignSelectLanguage';

type LayoutProps = {
  children: React.ReactNode;
};
export default async function Layout(props: Readonly<LayoutProps>) {
  const { children } = props;
  return (
    <Container direction="column" className="absolute inset-0 justify-center align-center gap-6">
      <Card className="w-xs sm:w-sm mx-auto">{children}</Card>
      <SignSelectLanguage />
    </Container>
  );
}
