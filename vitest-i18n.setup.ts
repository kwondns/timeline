import { Locale } from '@/i18n/routing';
import ko from './messages/ko.json';
import en from './messages/en.json';
import ja from './messages/ja.json';
import es from './messages/es.json';
import fr from './messages/fr.json';
import zhCN from './messages/zh-cn.json';
import { vi } from 'vitest';

const messagesObject: Record<Locale, any> = {
  ko,
  en,
  ja,
  es,
  fr,
  'zh-cn': zhCN,
};

const findMessage = (key: string, messageTree: Record<string, Record<string, string> | string>) => {
  if (key.includes('.')) {
    const k = key.split('.');
    const target = k.shift() ?? '';
    return findMessage(k.join('.'), messageTree[target] as Record<string, string>);
  }
  return messageTree[key];
};

export const createTranslations = (locale: Locale, namespace: string) => {
  let messages: Record<string, string> = {};
  if (namespace === '') messages = messagesObject[locale] ?? {};
  else messages = messagesObject[locale]?.[namespace] ?? {};
  return (key: string) => {
    return findMessage(key, messages);
  };
};

vi.mock('next-intl/server', () => {
  return {
    getTranslations: (ns?: string) => {
      const locale: Locale = (global as any).__TEST_LOCALE__ ?? 'ko';
      return createTranslations(locale, ns ?? '');
    },
  };
});

vi.mock('next-intl', async (defaultImport) => {
  return {
    ...defaultImport,
    useLocale: vi.fn(() => (global as any).__TEST_LOCALE__ ?? 'ko'),
    useTranslations: vi.fn((ns?: string) => {
      const locale: Locale = (global as any).__TEST_LOCALE__ ?? 'ko';
      return createTranslations(locale, ns ?? '');
    }),
  };
});

const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
  refresh: vi.fn(),
  prefetch: vi.fn(),
};
vi.mock('@/i18n/navigation', () => {
  return {
    useRouter: () => mockRouter,
  };
});
