import Container from '@/atoms/Container';
import Nav from '@/organisms/Nav';
import StartStopButton from '@/molecules/StartStopButton';
import Timer from '@/molecules/Timer';

export default function Header() {
  return (
    <Container className="py-4 px-2 justify-between items-center">
      <Timer />
      <Nav />
      <StartStopButton />
    </Container>
  );
}
