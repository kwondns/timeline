import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Typography from '@/atoms/Typography';

type TooltipButtonProps = {
  children: React.ReactNode;
  context: string;
};

export default function TooltipButton(props: TooltipButtonProps) {
  const { children, context } = props;
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="top" aria-label={context}>
        <Typography.p>{context}</Typography.p>
      </TooltipContent>
    </Tooltip>
  );
}
