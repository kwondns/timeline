import Container from '@/atoms/Container';
import Typography from '@/atoms/Typography';

type PastTemplateProps = {
  date: string;
  children: React.ReactNode;
};

export default function PastTemplate(props: PastTemplateProps) {
  const { date, children } = props;
  return (
    <Container direction="column" className="gap-4 h-full relative">
      <Typography.h2>{new Intl.DateTimeFormat('ko-kr').format(new Date(date))}</Typography.h2>
      {children}
    </Container>
  );
}
