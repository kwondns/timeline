'use server';

import { callFetch } from '@/lib/fetch';

type RequestValidateEmailActionType = {
  email: string;
};
export const requestValidateEmailAction = async (payload: RequestValidateEmailActionType) => {
  try {
    return await callFetch('/user/email-verification', payload, { method: 'POST' });
  } catch (e) {
    const error = e as { message: string };
    throw new Error(error.message);
  }
};
type ValidateCodeActionType = RequestValidateEmailActionType & {
  code: string;
};
export const validateCodeAction = async (payload: ValidateCodeActionType) => {
  const { code, ...body } = payload;
  try {
    return await callFetch('/user/check-verification-email', { ...body, code: Number(code) }, { method: 'POST' });
  } catch (e) {
    const error = e as { message: string };
    throw new Error(error.message);
  }
};

type SignUpActionType = RequestValidateEmailActionType & {
  password: string;
  passwordConfirm: string;
  name: string;
};
export const signUpAction = async (payload: SignUpActionType) => {
  const { passwordConfirm, ...body } = payload;
  if (passwordConfirm !== payload.password) throw new Error('비밀번호가 일치하지 않습니다.');
  try {
    await callFetch('/user/sign-up', body, { method: 'POST' });
    return true;
  } catch (e) {
    return false;
  }
};
