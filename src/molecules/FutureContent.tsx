import { Card } from '@/components/ui/card';
import Container from '@/atoms/Container';
import PriorityBadge from '@/atoms/PriorityBadge';
import CheckBoxWithAction from '@/atoms/CheckBoxWithAction';
import SliderWithAction from '@/atoms/SliderWithAction';
import FutureInputOrDisplay from '@/molecules/FutureInputOrDisplay';

export type FutureContentProps = FutureCheckContentProps | FuturePercentageContentProps;

export type FutureContentDefaultProps = {
  id: string;
  content: string;
};

export type FutureCheckContentProps = {
  checked: boolean;
  priority: 1 | 2 | 3;
} & FutureContentDefaultProps;

export type FuturePercentageContentProps = {
  percentage: number;
} & FutureContentDefaultProps;

const FutureCheckContent = (props: FutureCheckContentProps) => {
  const { id, checked, content, priority } = props;
  return (
    <Container className="justify-between items-center">
      <Container className="gap-4 flex-1 pr-3">
        <PriorityBadge priority={priority} />
        <FutureInputOrDisplay id={id} value={content} category="future" />
      </Container>
      <CheckBoxWithAction id={id} initState={checked} />
    </Container>
  );
};

const FuturePercentageContent = (props: FuturePercentageContentProps) => {
  const { percentage, content, id } = props;
  return (
    <Container direction="column" className="gap-3">
      <FutureInputOrDisplay id={id} value={content} category="future" />
      <SliderWithAction percentage={percentage} id={id} />
    </Container>
  );
};

export default function FutureContent(props: FutureContentProps) {
  return (
    <Card className="flex-1 p-4 bg-brown hover:-translate-y-1 transition-transform">
      {'checked' in props ? <FutureCheckContent {...props} /> : <FuturePercentageContent {...props} />}
    </Card>
  );
}
