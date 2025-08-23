import Container from '@/atoms/Container';
import Typography from '@/atoms/Typography';
import { getLocale } from 'next-intl/server';

type PastTemplateProps = {
  date: string;
  children: React.ReactNode;
};

export default async function PastTemplate(props: PastTemplateProps) {
  const { date, children } = props;

  const locale = await getLocale();
  return (
    <Container direction="column" className="gap-4 h-full relative">
      <Typography.h2>{new Intl.DateTimeFormat(locale).format(new Date(date))}</Typography.h2>
      {children}
    </Container>
  );
}
