import Typography from '@/atoms/Typography';
import { FADEIN_HIDDEN, FADEIN_VIEW } from '@/constants/TRANSITION';

type InputErrorProps = {
  value: string | null;
};
export default function InputError(props: Readonly<InputErrorProps>) {
  const { value } = props;
  const className = value ? FADEIN_VIEW : FADEIN_HIDDEN;
  return <Typography.span className={`text-destructive transition-all ${className}`}>{value}</Typography.span>;
}
