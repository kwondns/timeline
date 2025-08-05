import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Typography from '@/atoms/Typography';
import FutureContent, { FutureContentProps } from '@/molecules/FutureContent';
import Container from '@/atoms/Container';
import CheckBoxWithAction from '@/atoms/CheckBoxWithAction';
import NewFutureDialog from '@/organisms/NewFutureDialog';

export type FutureBoxCardProps = {
  title: string;
  id: string;
  checked: boolean;
  order: number;
  type: 'check' | 'progress';
  futures: FutureContentProps[];
};
export default function FutureBoxCard(props: FutureBoxCardProps) {
  const { title, id, checked, type, futures } = props;
  return (
    <Card className="p-6" id={id}>
      <CardHeader>
        <Container className="justify-between">
          <Typography.h3>{title}</Typography.h3>
          <Container className="items-center gap-2">
            <NewFutureDialog boxId={id} type={type} />
            <CheckBoxWithAction id={id} initState={checked} category="box" />
          </Container>
        </Container>
      </CardHeader>
      <CardContent className="overflow-x-auto grid grid-cols-[repeat(auto-fit,_minmax(300px,1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(450px,1fr))] gap-4 p-4">
        {futures.map((future) => (
          <FutureContent key={future.id} {...future} />
        ))}
        {futures.length < 1 && <Typography.h4 className="pl-2">작업을 추가 해주세요!</Typography.h4>}
      </CardContent>
    </Card>
  );
}
