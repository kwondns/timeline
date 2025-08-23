import { redirect } from '@/i18n/navigation';
import { safeParseJSON } from '@/lib/dal/http/core';
import { getTokenAndUserId } from '@/lib/auth/token';

export async function callGetWithAuth<T>(url: string, options: RequestInit & { tag: string }): Promise<T> {
  const { tag, ...option } = options;
  const { userId, token, locale } = await getTokenAndUserId();
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
        next: { tags: [`${tag}-${userId}`], ...option?.next },
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
    redirect({ href: '/sign/in?toast=loginRequired', locale });
  }
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`GET ${url} failed: ${response.status} ${text}`);
  }
  return (await safeParseJSON(response)) as T;
}
