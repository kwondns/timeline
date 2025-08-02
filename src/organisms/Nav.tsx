import Container from '@/atoms/Container';
import IconButton from '@/atoms/IconButton';
import TooltipButton from '@/molecules/TooltipButton';
import Link from 'next/link';

export default function Nav() {
  return (
    <Container className="gap-3">
      <TooltipButton context="과거">
        <Link href="/past">
          <IconButton variant="outline" icon="sandClock" size="lg" />
        </Link>
      </TooltipButton>
      <TooltipButton context="현재">
        <Link href="/present">
          <IconButton variant="outline" icon="time" size="lg" />
        </Link>
      </TooltipButton>
      <TooltipButton context="미래">
        <Link href="/future">
          <IconButton variant="outline" icon="rocket" size="lg" />
        </Link>
      </TooltipButton>
    </Container>
  );
}
