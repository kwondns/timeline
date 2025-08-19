'use server';

import { AuthResponseType } from '@/types/auth.type';

/**
 * @function refresh
 * @description 주어진 리프레쉬 토큰을 이용하여 사용자 인증 정보를 갱신합니다.
 *
 * @param {string} [refreshToken] — 갱신할 인증 정보를 위한 리프레쉬 토큰입니다. 선택 사항이며, 값이 없을 경우 null을 반환합니다.
 * @returns {Promise<null | AuthResponseType>} — 갱신된 인증 정보를 포함하는 객체를 반환하거나, 실패 시 null을 반환합니다.
 * @throws {Error} — 네트워크 오류 또는 서버 응답 상태가 성공적이지 않을 경우 발생합니다.
 *
 * @example
 * // 리프레쉬 토큰을 이용해 인증 정보를 갱신하는 예
 * const updatedAuth = await refresh('your-refresh-token');
 * console.log(updatedAuth); // 갱신된 인증 정보가 출력됩니다.
 *
 * @example
 * // 리프레쉬 토큰이 없는 경우
 * const result = await refresh();
 * console.log(result); // null
 *
 * @see https://developer.mozilla.org/ko/docs/Web/API/Fetch_API — Fetch API 관련 정보
 */
export async function refresh(refreshToken?: string): Promise<null | AuthResponseType> {
  if (!refreshToken) return null;

  const res = await fetch(`${process.env.API_SERVER_URL}/user/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `refresh-token=${refreshToken}`,
    },
    cache: 'no-cache',
  });
  if (!res.ok) return null;
  return (await res.json()) as AuthResponseType;
}
