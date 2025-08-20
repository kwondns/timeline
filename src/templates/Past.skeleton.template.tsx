import Typography from '@/atoms/Typography';
import Container from '@/atoms/Container';

export default function PastSkeletonTemplate() {
  return (
    <>
      <Typography.h4 className="absolute top-1 right-2">--시 --분</Typography.h4>
      <Container className="size-full justify-center items-center">
        <Typography.span className="text-foreground/70 h-full content-center">로딩중...</Typography.span>
      </Container>
    </>
  );
}
