'use server';

import { callFetch } from '@/lib/fetch';
import { SignUpSchema } from '@/schemas/signUp.schema';
import z from 'zod';

type RequestValidateEmailActionType = {
  email: string;
};
export const requestValidateEmailAction = async (payload: RequestValidateEmailActionType) => {
  const body = SignUpSchema.pick({ email: true }).safeParse(payload);
  if (!body.success) return { errors: z.treeifyError(body.error).properties };
  return await callFetch<RequestValidateEmailActionType>('/user/email-verification', payload, {
    method: 'POST',
    expectNoContent: true,
  });
};

type ValidateCodeActionType = RequestValidateEmailActionType & {
  code: string | number;
};

type ValidateCodeActionResponseType = {
  isVerified: boolean;
};
export const validateCodeAction = async (payload: ValidateCodeActionType) => {
  const { code, ...body } = payload;
  return await callFetch<ValidateCodeActionType, ValidateCodeActionResponseType>(
    '/user/check-verification-email',
    { ...body, code: Number(code) },
    { method: 'POST' },
  );
};

type SignUpActionType = RequestValidateEmailActionType & {
  password: string;
  passwordConfirm: string;
  name: string;
};

type SignUpActionResponse = {
  userId: string;
  name: string;
  accessToken: string;
};
export const signUpAction = async (payload: SignUpActionType) => {
  const body = SignUpSchema.safeParse(payload);
  if (!body.success) return { errors: z.treeifyError(body.error).properties };
  const { passwordConfirm, ...others } = body.data;
  return await callFetch<Omit<SignUpActionType, 'passwordConfirm'>, SignUpActionResponse>('/user/sign-up', others, {
    method: 'POST',
  });
};
