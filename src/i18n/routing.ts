import { defineRouting } from 'next-intl/routing';

export const LOCALE = ['ko', 'en', 'ja', 'es', 'fr', 'zh-cn'] as const;
export type Locale = (typeof LOCALE)[number];

export const routing = defineRouting({
  locales: LOCALE,
  defaultLocale: 'ko',
  localeCookie: {
    name: 'NEXT_LOCALE',
    maxAge: 24 * 60 * 60 * 365,
  },
});
