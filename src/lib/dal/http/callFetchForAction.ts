import { redirect } from '@/i18n/navigation';
import { isJsonResponse, safeParseJSON } from '@/lib/dal/http/core';
import { getTokenAndUserId } from '@/lib/auth/token';

// 204일 경우
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

/**
 * @function callFetchForAction
 * @description 주어진 URL과 페이로드(payload)를 기반으로 API 요청을 수행하며,
 * JSON 데이터를 반환하거나 예외를 처리합니다.
 *
 * @param {string} url — 요청을 보낼 API의 경로입니다. 절대 경로가 아닌 상대 경로를 입력합니다.
 * @param {T} payload — 요청에 필요한 데이터입니다. JSON 형태로 변환되어 전송됩니다.
 * @param {RequestInit & { expectNoContent?: boolean; auth?: boolean }} [options={}] —
 * 요청 설정을 포함하는 객체입니다.
 * - `expectNoContent`: 응답 바디가 없을 것으로 예상될 경우 true로 설정합니다. (선택)
 * - `auth`: 헤더에 인증 토큰을 포함할 여부를 설정합니다. true일 경우 'auth-token'이라는 쿠키에서 값을 가져옵니다. (선택)
 * - 기타 fetch의 RequestInit 속성을 포함합니다.
 *
 * @returns {Promise<R | void>} — 서버 응답 데이터가 JSON인 경우 파싱된 객체를 반환합니다.
 * 응답이 204 No Content 상태코드거나 `expectNoContent` 옵션이 true일 경우 `void`를 반환합니다.
 *
 * @throws {Error} — API 호출이 실패하거나, 응답이 올바르지 않은 경우 메시지를 포함하는 Error를 던집니다.
 * - 인증 오류(401)가 발생한 경우 `/sign/in?toast=loginRequired`로 리다이렉트합니다.
 * - 응답이 정상적이지 않을 경우 서버에서 제공한 오류 메시지를 포함하는 Error가 발생합니다.
 *
 * @example
 * // 기본 사용 예시
 * const url = '/api/v1/resource';
 * const payload = { data: 'example' };
 * const response = await callFetchForAction<typeof payload, ResponseData>(url, payload);
 *
 * @example
 * // 응답 바디가 없는 요청의 예시
 * await callFetchForAction('/api/v1/resource', {}, { expectNoContent: true });
 *
 * @see https://developer.mozilla.org/ko/docs/Web/API/fetch
 * @see https://developer.mozilla.org/ko/docs/Web/API/Request
 *
 */
export async function callFetchForAction<T, R>(
  url: string,
  payload: T,
  options: RequestInit & { expectNoContent?: boolean; auth?: boolean } = {},
): Promise<R | void> {
  const { token, locale } = await getTokenAndUserId();

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
    redirect({ href: '/sign/in?toast=loginRequired', locale });
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
