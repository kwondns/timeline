import Container from '@/atoms/Container';
import { Card } from '@/components/ui/card';
import SignSelectLanguageClient from '@/organisms/SignSelectLanguage.client';

type LayoutProps = {
  children: React.ReactNode;
};
export default async function Layout(props: Readonly<LayoutProps>) {
  const { children } = props;
  return (
    <Container direction="column" className="absolute inset-0 justify-center align-center gap-6">
      <Card className="w-xs sm:w-sm mx-auto">{children}</Card>
      <SignSelectLanguageClient />
    </Container>
  );
}
