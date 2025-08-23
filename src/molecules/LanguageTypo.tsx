import Typography from '@/atoms/Typography';
import { Icon } from '@/atoms/Icon';
import { Locale } from '@/i18n/routing';

type LanguageTypoProps = {
  locale: Locale;
  text: string;
};
export default function LanguageTypo(props: LanguageTypoProps) {
  const { locale, text } = props;
  return (
    <Typography.span className="inline-flex items-center gap-2">
      {Icon[locale]} {text}
    </Typography.span>
  );
}
