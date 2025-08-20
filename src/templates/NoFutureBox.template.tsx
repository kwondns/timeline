import { Card } from '@/components/ui/card';
import Typography from '@/atoms/Typography';

export default function NoFutureBoxTemplate() {
  return (
    <Card className="p-6 max-h-[450px]">
      <Typography.span>계획을 추가 해주세요!</Typography.span>
    </Card>
  );
}
