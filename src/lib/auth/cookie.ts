import { cookies } from 'next/headers';
import * as T from 'fp-ts/Task';
import * as O from 'fp-ts/Option';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { pipe } from 'fp-ts/function';
import { Locale } from '@/i18n/routing';
// import { curry } from 'lodash';
/**
 * @function setCookie
 * 주어진 키와 값을 기반으로 HTTP 쿠키를 설정하는 함수입니다.
 *
 * ### 기능 요약(What)
 * - HTTP 쿠키를 생성하고 저장합니다.
 *
 * ### 사용 사례(When/Why)
 * - 상태 정보를 클라이언트에 보존하고, 다음 요청에 이를 사용할 때 유용합니다.
 * - 예를 들어, 세션 정보나 사용자 설정을 저장할 때 사용됩니다.
 *
 * ### 동작 방식(How)
 * - 쿠키 저장소를 비동기로 가져온 뒤, 주어진 옵션을 포함한 쿠키를 설정합니다.
 * - `httpOnly`, `secure`, `expires`, `sameSite`, `path`와 같은 옵션으로 쿠키의 동작 방식을 세부적으로 설정합니다.
 *
 * @param {string} key - (필수) 쿠키의 키 이름.
 * @param {string} value - (필수) 쿠키에 저장할 값.
 * @param {number} expiresAt - (필수) 쿠키의 만료 시간(현재 시간 + 주어진 기간, 밀리초 단위).
 * @returns {Promise<void>} 설정된 쿠키 정보는 저장되지만 별도의 반환값은 없습니다.
 *
 * @throws {Error} `cookies()` 메서드 호출 실패 시 발생할 수 있습니다.
 * @throws {TypeError} key, value 또는 expiresAt 값이 유효하지 않은 경우.
 *
 * @example
 * // Example: 사용자 인증 세션을 설정
 * await setCookie('session_id', 'abc123', 604800000); // 세션 ID 쿠키를 7일 동안 유지
 *
 * @example
 * // Example: 사용자 선호 언어를 쿠키에 저장
 * await setCookie('preferredLang', 'ko', 2592000000); // 30일 유지
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies} 쿠키 사용에 대한 자세한 정보
 */
export async function setCookie(key: string, value: string, expiresAt: number): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(key, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: Date.now() + expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export const createCookieTask: T.Task<ReadonlyRequestCookies> = () => cookies();
export const extractFromCookie = (key: string, cookieStore: ReadonlyRequestCookies) =>
  pipe(
    cookieStore.get(key),
    O.fromNullable,
    O.chain((cookie) =>
      pipe(
        cookie.value,
        O.fromNullable,
        O.filter((v) => v.trim() !== ''),
      ),
    ),
  );
export const extractFromCookieWithDefault = (key: string, defaultValue: string, cookieStore: ReadonlyRequestCookies) =>
  pipe(
    extractFromCookie(key, cookieStore),
    O.getOrElse(() => defaultValue),
  );

export const getTokenTask: T.Task<O.Option<string>> = pipe(
  createCookieTask,
  T.map((cookie) => extractFromCookie('auth-token', cookie)),
);

export const getLocaleTask: T.Task<Locale> = pipe(
  createCookieTask,
  T.map((cookieStore) => extractFromCookieWithDefault('NEXT_LOCALE', 'ko', cookieStore) as Locale),
);

export const getSessionTask: T.Task<O.Option<string>> = pipe(
  createCookieTask,
  T.map((cookie) => extractFromCookie('session', cookie)),
);

export const getRefreshTokenTask: T.Task<O.Option<string>> = pipe(
  createCookieTask,
  T.map((cookie) => extractFromCookie('refresh-token', cookie)),
);
