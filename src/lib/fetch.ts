// 204 응답인 경우 R=void
import { cookies } from 'next/headers';
import { verifySession } from '@/lib/session';
import { redirect } from 'next/navigation';

export function callFetch<T extends Record<string, any>>(
  url: string,
  payload: T,
  options?: RequestInit & { expectNoContent: true; auth?: boolean },
): Promise<void>;

// 콘텐츠 있는 경우
export function callFetch<T extends Record<string, any>, R>(
  url: string,
  payload: T,
  options?: RequestInit & { auth?: boolean },
): Promise<R>;

export async function callFetch<T extends Record<string, string | boolean | number>, R>(
  url: string,
  payload: T,
  options: RequestInit & { expectNoContent?: boolean; auth?: boolean } = {},
): Promise<R | void> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (options.auth) {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  const response = await fetch(`${process.env.API_SERVER_URL}${url}`, {
    body: JSON.stringify(payload),
    headers,
    ...options,
  });
  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || '알 수 없는 오류가 발생했습니다.');
  }
  if (response.status === 204 || options.expectNoContent) {
    return;
  }

  return (await response.json()) as R;
}

export async function callGetWithAuth<T>(url: string): Promise<T> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('auth-token')?.value;
  const response = await fetch(`${process.env.API_SERVER_URL}${url}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return (await response.json()) as Promise<T>;
}

export const fileUpload = async (payload: File[] | File, uri?: string, num?: number) => {
  const formData = new FormData();

  if (payload instanceof Array) payload.forEach((file, index) => formData.append(`file-${index}`, file));
  else formData.append('file', payload);

  if (uri) formData.append('uri', `${uri.replaceAll(' ', '_').replaceAll('(', '<').replaceAll(')', '>')}/`);
  formData.append('num', num ? String(num) : '1');
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  const result = await fetch(`${process.env.API_SERVER_URL.split('/time')[0]}/upload/timeline`, {
    body: formData,
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.json();
};

export function withAuth<T extends any[], R>(fn: (...args: T) => Promise<R>): (...args: T) => Promise<R> {
  return async (...args: T) => {
    const session = await verifySession();
    if (!session?.isAuth) redirect('/sign/in?toast=loginRequired');

    return await fn(...args);
  };
}
