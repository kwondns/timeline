'use server';

import { cookies, headers } from 'next/headers';
import { Locale } from '@/i18n/routing';

/**
 * @async
 * @function getTokenAndUserId
 * @description 사용자 인증 토큰, 사용자 ID, 및 로케일 정보를 가져옵니다.
 *
 * @returns {Promise<{token: string, userId: string, locale: Locale}>}
 * — 인증 토큰, 사용자 ID, 및 로케일 정보를 포함하는 객체를 반환합니다.
 *      - `token`: 쿠키에 저장된 'auth-token' 값. 없을 경우 빈 문자열 반환
 *      - `userId`: 요청 헤더에 포함된 'x-user-id' 값. 없을 경우 'guest' 반환
 *      - `locale`: 쿠키에 저장된 'NEXT_LOCALE' 값. 없을 경우 'ko' 반환
 *
 * @throws {Error} — 쿠키 또는 헤더를 가져오는 과정에서 발생하는 오류를 반환합니다.
 *
 * @example
 * // 함수 사용 예시
 * (async () => {
 *   const { token, userId, locale } = await getTokenAndUserId();
 *   console.log(token); // 예: "abcd1234"
 *   console.log(userId); // 예: "user123"
 *   console.log(locale); // 예: "ko"
 * })();
 *
 * @see https://developer.mozilla.org/ko/docs/Web/API/Document/cookie
 * @see https://developer.mozilla.org/ko/docs/Web/API/Headers
 */
export async function getTokenAndUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value ?? '';
  const locale = cookieStore.get('NEXT_LOCALE')?.value ?? 'ko';
  const userId = (await headers()).get('x-user-id') ?? 'guest';

  return { token, userId, locale: locale as Locale };
}
