'use server';

import { cookies, headers } from 'next/headers';

/**
 * @function getTokenAndUserId
 * @description 사용자 인증 토큰과 사용자 ID를 비동기적으로 가져옵니다.
 *
 * @returns {Promise<{token: string, userId: string}>} — 인증 토큰과 사용자 ID를 포함한 객체를 반환합니다.
 * 기본적으로 토큰은 'auth-token' 쿠키 값이고, 사용자 ID는 'x-user-id' 헤더 값입니다.
 * 'auth-token' 쿠키 값이 없으면 빈 문자열('')이 반환되며, 'x-user-id' 헤더 값이 없으면 'guest'가 반환됩니다.
 *
 * @throws {Error} — 쿠키 또는 헤더 정보를 가져오는 과정에서 문제가 발생할 경우 예외가 발생할 수 있습니다.
 *
 * @example
 * // Example of usage:
 * getTokenAndUserId()
 *   .then(({ token, userId }) => {
 *     console.log(`토큰: ${token}, 사용자 ID: ${userId}`);
 *   })
 *   .catch((err) => {
 *     console.error('인증 정보를 가져오는 중 오류 발생:', err);
 *   });
 *
 * @see https://developer.mozilla.org/ko/docs/Web/API/Document/cookie
 * @see https://developer.mozilla.org/ko/docs/Web/API/Headers
 */
export async function getTokenAndUserId() {
  const token = (await cookies()).get('auth-token')?.value ?? '';
  const userId = (await headers()).get('x-user-id') ?? 'guest';
  return { token, userId };
}
