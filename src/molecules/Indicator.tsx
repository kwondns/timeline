import Typography from '@/atoms/Typography';
import { useTranslations } from 'next-intl';

type IndicatorProps = {
  active?: boolean;
  className?: string;
};
export default function Indicator(props: IndicatorProps) {
  const { active, className = '' } = props;
  const t = useTranslations('Present');
  const indicatorStyle =
    "before:content-[''] before:w-3 before:h-3 before:rounded-full before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0 before:bg-blue-300";
  return (
    <Typography.p
      className={`relative  text-blue-300 px-5 ${indicatorStyle} ${active ? 'before:animate-pulse' : 'before:bg-rose/40 text-rose/40'} ${className}`}
      aria-label={active ? t('working') : t('resting')}
      aria-live="polite"
    >
      {active ? t('working') : t('resting')}
    </Typography.p>
  );
}
