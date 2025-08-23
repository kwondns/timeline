import { z } from 'zod';
import { getTranslations } from 'next-intl/server';
import { Locale } from '@/i18n/routing';

const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
const numberRegex = /\d/;

export type SignInType = z.infer<Awaited<ReturnType<typeof createSignInSchema>>>;

export async function createSignInSchema(locale: Locale) {
  const t = await getTranslations({ locale, namespace: 'ValidateInput' });
  const passwordRule = z
    .string()
    .nonempty({ message: t('password') })
    .min(8, { message: t('passwordMin') })
    .refine((val) => numberRegex.test(val), { message: t('passwordNum') })
    .refine((val) => symbolRegex.test(val), { message: t('passwordSymbol') });

  return z.object({
    email: z.email(t('email')),
    password: passwordRule,
  });
}
