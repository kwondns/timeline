'use server';

import { callFetchForAction } from '@/lib/dal/http';
import { createSignUpSchema } from '@/schemas/signUp.schema';
import { getLocale } from 'next-intl/server';
import z from 'zod';

type RequestValidateEmailActionType = {
  email: string;
};
export const requestValidateEmailAction = async (payload: RequestValidateEmailActionType) => {
  const locale = await getLocale();
  const signUpSchema = await createSignUpSchema(locale);
  const body = signUpSchema.pick({ email: true }).safeParse(payload);
  if (!body.success) return { errors: z.treeifyError(body.error).properties };
  return await callFetchForAction<RequestValidateEmailActionType>('/user/email-verification', payload, {
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
  return await callFetchForAction<ValidateCodeActionType, ValidateCodeActionResponseType>(
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
  try {
    const locale = await getLocale();
    const signUpSchema = await createSignUpSchema(locale);
    const body = signUpSchema.safeParse(payload);
    if (!body.success) return { errors: z.treeifyError(body.error).properties };
    const { passwordConfirm: _passwordConfirm, ...others } = body.data;
    return await callFetchForAction<Omit<SignUpActionType, 'passwordConfirm'>, SignUpActionResponse>(
      '/user/sign-up',
      others,
      {
        method: 'POST',
      },
    );
  } catch (e) {
    const error = e as Error;
    return {
      success: false,
      error: error.message,
    };
  }
};
