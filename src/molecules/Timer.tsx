import Container from '@/atoms/Container';
import Typography from '@/atoms/Typography';

export default function Timer() {
  return (
    <Container direction="column">
      <Typography.h3 className="text-destructive/90">{new Date().toLocaleString('ko-kr')}</Typography.h3>
      <Typography.p>{new Date().toLocaleString('ko-kr')}</Typography.p>
    </Container>
  );
}
