import { cookies, headers } from 'next/headers';
import { refreshSession, verifySession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { refresh, validateRefreshToken } from '@/lib/dal/auth';
import { NoRefreshTokenError } from '@/lib/error';

function isJsonResponse(res: Response) {
  const ct = res.headers.get('Content-Type') || '';
  return ct.includes('application/json');
}

async function safeParseJSON<T>(res: Response): Promise<T> {
  if (!isJsonResponse(res)) {
    const txt = await res.text();
    try {
      return JSON.parse(txt) as T;
    } catch {
      throw new Error(`Unexpected content-type. Expected JSON. Status=${res.status}`);
    }
  }
  return (await res.json()) as T;
}

async function requestRefreshAndReturnToken(): Promise<string | undefined> {
  console.log(2);
  try {
    const refreshRes = await fetch(`${process.env.LOCAL}/api/refresh`, { method: 'POST', credentials: 'include' });
    if (refreshRes.status === 401) {
      redirect('/sign/in?toast=loginRequired');
    }
    const newToken = (await cookies()).get('auth-token')?.value;
    if (!newToken) {
      redirect('/sign/in?toast=loginRequired');
    }
    return newToken;
  } catch (e) {
    console.error(e);
  }
}

// 204 응답인 경우 R=void
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
  const doRequest = async (token?: string) => {
    const h = new Headers(options?.headers);
    h.set('Content-Type', 'application/json');
    if (options.auth && token) h.set('Authorization', `Bearer ${token}`);
    return fetch(`${process.env.API_SERVER_URL}${url}`, {
      ...options,
      body: JSON.stringify(payload),
      headers: h,
    });
  };

  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  let response = await doRequest(token);
  if (response.status === 401 && options.auth) {
    const newToken = await requestRefreshAndReturnToken();
    response = await doRequest(newToken);
    if (response.status === 401) {
      redirect('/sign/in?toast=loginRequired');
    }
  }
  if (!response.ok) throw new Error(`POST ${url} failed: ${response.status}`);
  if (response.status === 204 || options.expectNoContent) {
    return;
  }
  if (response.status === 201 || isJsonResponse(response)) return (await safeParseJSON(response)) as R;

  return undefined as unknown as R;
}

export async function callGetWithAuth<T>(url: string, options?: RequestInit): Promise<T> {
  const userId = (await headers()).get('x-user-id') || 'guest';
  const doRequest = async (token?: string) => {
    const h = new Headers(options?.headers);
    if (token) h.set('Authorization', `Bearer ${token}`);
    h.set('x-cache-key', `uid-${userId}`);

    return fetch(`${process.env.API_SERVER_URL}${url}`, {
      method: 'GET',
      credentials: 'include',
      headers: h,
      next: options?.next,
    });
  };
  const cookieStore = await cookies();
  let authToken = cookieStore.get('auth-token')?.value;
  let response = await doRequest(authToken);
  // 401 Unauthorized 시 토큰 재발급
  if (response.status === 401) {
    console.log('1');
    const newToken = await requestRefreshAndReturnToken();
    const latest = (await cookies()).get('auth-token')?.value || newToken;
    response = await doRequest(latest);
    if (response.status === 401) {
      redirect('/sign/in?toast=loginRequired');
    }
  }
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`GET ${url} failed: ${response.status} ${text}`);
  }
  return (await safeParseJSON(response)) as T;
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
    if (!session) {
      try {
        const token = await validateRefreshToken();
        const result = await refresh(token);
        if (!result) throw new NoRefreshTokenError();
        await refreshSession(result);
      } catch (e) {
        if (e instanceof NoRefreshTokenError) redirect('/sign/in?toast=loginRequired');
      }
    }
    return await fn(...args);
  };
}
