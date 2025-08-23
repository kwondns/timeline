import { hasLocale } from 'use-intl';
import { routing } from '@/i18n/routing';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  let currentLocale = await requestLocale;

  const locale = hasLocale(routing.locales, currentLocale) ? currentLocale : routing.defaultLocale;
  return { locale, messages: (await import(`../../messages/${locale}.json`)).default };
});
