import Typography from '@/atoms/Typography';
import { Icon } from '@/atoms/Icon';
import { Locale } from '@/i18n/routing';

type LanguageTypoProps = {
  locale: Locale;
};
export default function LanguageTypo(props: LanguageTypoProps) {
  const { locale } = props;
  let text;
  switch (locale) {
    case 'ko':
      text = '한국어';
      break;
    case 'en':
      text = 'English';
      break;
    case 'ja':
      text = '日本語';
      break;
    case 'es':
      text = 'Español';
      break;
    case 'fr':
      text = 'Français';
      break;
    case 'zh-cn':
      text = '中文';
      break;
  }
  return (
    <Typography.span className="inline-flex items-center gap-2">
      {Icon[locale]} {text}
    </Typography.span>
  );
}
