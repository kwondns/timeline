import Container from '@/atoms/Container';
import Kbd from '@/atoms/Kbd';

export default function KbdGroup() {
  return (
    <Container className="items-center gap-x-2">
      <Kbd>CTL</Kbd>OR
      <Kbd>⌘</Kbd>+<Kbd>S</Kbd>
    </Container>
  );
}
