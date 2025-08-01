import Container from '@/atoms/Container';
import IconButton from '@/atoms/IconButton';
import TooltipButton from '@/molecules/TooltipButton';

export default function Nav() {
  return (
    <Container className="gap-3">
      <TooltipButton context="과거">
        <IconButton variant="outline" icon="sandClock" size="lg" />
      </TooltipButton>
      <TooltipButton context="현재">
        <IconButton variant="outline" icon="time" size="lg" />
      </TooltipButton>
      <TooltipButton context="미래">
        <IconButton variant="outline" icon="rocket" size="lg" />
      </TooltipButton>
    </Container>
  );
}
