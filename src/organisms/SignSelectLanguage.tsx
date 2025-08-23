'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Container from '@/atoms/Container';
import LanguageTypo from '@/molecules/LanguageTypo';
import { LOCALE, Locale } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

const SelectItemWrapper = ({ locale }: { locale: Locale }) => {
  return (
    <SelectItem value={locale}>
      <LanguageTypo locale={locale} />
    </SelectItem>
  );
};

export default function SignSelectLanguage() {
  const locale = useLocale();
  const t = useTranslations('Navigation.Setting');
  const route = useRouter();
  const pathname = usePathname();
  const onChangeLocale = (value: Locale) => {
    route.replace(pathname, { locale: value });
  };
  return (
    <Container className="absolute right-4 top-4">
      <Select defaultValue={locale} onValueChange={onChangeLocale}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t('language')}</SelectLabel>
            {LOCALE.map((lang) => (
              <SelectItemWrapper key={lang} locale={lang} />
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Container>
  );
}
