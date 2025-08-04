import FutureBoxCard, { FutureBoxCardProps } from '@/organisms/FutureBoxCard';
import Container from '@/atoms/Container';
import Typography from '@/atoms/Typography';

export type FutureTemplateProps = { futureBoxes: FutureBoxCardProps[] };
export default function FutureTemplate(props: FutureTemplateProps) {
  const { futureBoxes } = props;
  return (
    <Container direction="column" className="gap-4 py-8 px-4">
      <Typography.h1 className="self-start">미래 계획</Typography.h1>
      <Typography.h4 className="text-foreground/50 mb-4">목표 설정</Typography.h4>
      <Container direction="column" className="gap-4">
        {futureBoxes.map((futureBox) => (
          <FutureBoxCard key={futureBox.id} {...futureBox} />
        ))}
      </Container>
    </Container>
  );
}
