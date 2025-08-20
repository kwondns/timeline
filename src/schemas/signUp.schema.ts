import z from 'zod';
import { passwordRule, SignInSchema } from '@/schemas/signIn.schema';

export const SignUpSchema = SignInSchema.extend({
  passwordConfirm: passwordRule,
  name: z.string('이름을 입력해주세요!'),
}).refine((data) => data.password === data.passwordConfirm, {
  message: '패스워드가 다릅니다!',
  path: ['passwordConfirm'],
});
