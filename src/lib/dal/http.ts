import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ensureValidTokenForAction } from '@/lib/dal/action';

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

// 204 응답인 경우 R=void
export function callFetchForAction<T extends Record<string, any>>(
  url: string,
  payload: T,
  options?: RequestInit & { expectNoContent: true; auth?: boolean },
): Promise<void>;

// 콘텐츠 있는 경우
export function callFetchForAction<T extends Record<string, any>, R>(
  url: string,
  payload: T,
  options?: RequestInit & { auth?: boolean },
): Promise<R>;

export async function callFetchForAction<T, R>(
  url: string,
  payload: T,
  options: RequestInit & { expectNoContent?: boolean; auth?: boolean } = {},
): Promise<R | void> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  const header = new Headers(options?.headers);
  header.set('Content-Type', 'application/json');
  if (options.auth && token) header.set('Authorization', `Bearer ${token}`);

  const response = await fetch(`${process.env.API_SERVER_URL}${url}`, {
    ...options,
    body: JSON.stringify(payload),
    headers: header,
  });

  // 401은 미들웨어에서 이미 처리되었으므로 여기서는 간단히 리다이렉트
  if (response.status === 401) {
    redirect('/sign/in?toast=loginRequired');
  }

  if (!response.ok) {
    const error = await response.json();
    const errorMessage = Array.isArray(error.message) ? error.message[0] : error.message;
    throw new Error(errorMessage || '알 수 없는 오류');
  }

  if (response.status === 204 || options.expectNoContent) {
    return;
  }

  if (response.status === 201 || isJsonResponse(response)) {
    return (await safeParseJSON(response)) as R;
  }

  return undefined as unknown as R;
}

export async function callGetWithAuth<T>(
  url: string,
  options: RequestInit & { userId: string; token: string },
): Promise<T> {
  const { userId, token, ...option } = options;
  const doRequest = async (userId: string, token?: string) => {
    const h = new Headers(options?.headers);
    if (token) h.set('Authorization', `Bearer ${token}`);
    h.set('x-cache-key', `uid-${userId}`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10초 타임아웃

    try {
      return await fetch(`${process.env.API_SERVER_URL}${url}`, {
        method: 'GET',
        credentials: 'include',
        headers: h,
        next: option?.next,
        signal: controller.signal,
      });
    } catch (e) {
      const error = e as object;
      if ('name' in error && error.name === 'AbortError') {
        throw new Error(`Request timeout: ${url}`);
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  };
  let response = await doRequest(userId, token);
  // 401 Unauthorized 시 토큰 재발급
  if (response.status === 401) {
    redirect('/sign/in?toast=loginRequired');
  }
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`GET ${url} failed: ${response.status} ${text}`);
  }
  return (await safeParseJSON(response)) as T;
}

export const fileUpload = async (payload: File[] | File, uri?: string, num?: number): Promise<string[]> => {
  const tokenResult = await ensureValidTokenForAction();
  if (!tokenResult.success) {
    redirect('/sign/in?toast=loginRequired');
  }
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
  if (result.status === 401) redirect('/sign/in?toast=loginRequired');
  return result.json();
};

/**
 * 서버 액션 wrapper - 토큰 검증 후 액션 실행
 */
export function withTokenValidation<T extends unknown[], R>(
  action: (...args: T) => Promise<R>,
): (...args: T) => Promise<R> {
  return async (...args: T) => {
    const { success } = await ensureValidTokenForAction();

    if (!success) {
      redirect('/sign/in?toast=loginRequired');
    }
    return await action(...args);
  };
}
