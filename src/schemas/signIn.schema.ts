import { z } from 'zod';

const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
const numberRegex = /\d/;

export const passwordRule = z
  .string()
  .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  .refine((val) => numberRegex.test(val), {
    message: '비밀번호에 숫자를 최소 1개 포함해야 합니다.',
  })
  .refine((val) => symbolRegex.test(val), {
    message: '비밀번호에 특수문자를 최소 1개 포함해야 합니다.',
  });

export const SignInSchema = z.object({
  email: z.email('올바른 이메일을 입력해주세요!'),
  password: passwordRule,
});
