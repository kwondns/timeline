import z from 'zod';
import { Locale } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
const numberRegex = /\d/;

export async function createSignUpSchema(locale: Locale) {
  const t = await getTranslations({ locale, namespace: 'ValidateInput' });

  const passwordRule = z
    .string()
    .nonempty({ message: t('password') })
    .min(8, { message: t('passwordMin') })
    .refine((val) => numberRegex.test(val), { message: t('passwordNum') })
    .refine((val) => symbolRegex.test(val), { message: t('passwordSymbol') });

  return z
    .object({
      email: z.email(t('email')),
      password: passwordRule,
      passwordConfirm: passwordRule,
      name: z.string(t('name')),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: t('passwordDiff'),
      path: ['passwordConfirm'],
    });
}
