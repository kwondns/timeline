import { Button } from '@/components/ui/button';
import Container from '@/atoms/Container';
import Typography from '@/atoms/Typography';

export default function StartStopButton() {
  return (
    <Container className="gap-2">
      <Button variant="info" size="lg">
        <Typography.h4>시작</Typography.h4>
      </Button>
      <Button variant="rose" size="lg">
        <Typography.h4>종료</Typography.h4>
      </Button>
    </Container>
  );
}
