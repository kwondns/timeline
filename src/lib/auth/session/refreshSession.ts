'use server';

import { TOKEN_EXPIRY } from '@/constants/TOKEN_TTL';
import { setCookie } from '@/lib/auth/cookie';
import { encrypt } from '@/lib/auth/session/encrypt';
import { AuthResponseType } from '@/types/auth.type';

/**
 * @function refreshSession
 * @description 사용자 인증 정보를 갱신하고 새로운 세션을 설정합니다. 유효하지 않은 입력이
 *               주어지면 세션과 관련된 쿠키를 비웁니다.
 *
 * @param {AuthResponseType} refreshed — 갱신된 인증 정보 객체입니다. null 또는 undefined일 경우,
 *                                      기존 세션은 무효화됩니다. (필수)
 * @returns {Promise<string | null>} — 갱신된 accessToken을 반환합니다. 세션 무효화 시 null을 반환합니다.
 * @throws {Error} — 인증 정보 암호화(encrypt) 또는 쿠키 설정(setCookie) 과정에서 오류가 발생할 경우 예외를 발생시킵니다.
 *
 * @example
 * // 유효한 인증 정보를 사용하여 세션 갱신
 * const updatedSession = await refreshSession({
 *   userId: 'user123',
 *   accessToken: 'newAccessToken123',
 *   refreshToken: 'newRefreshToken123',
 * });
 * console.log(updatedSession); // 'newAccessToken123'
 *
 * @example
 * // 인증 정보가 없는 경우 세션 초기화
 * const updatedSession = await refreshSession(null);
 * console.log(updatedSession); // null
 *
 * @see setCookie — 쿠키 설정 메서드
 * @see encrypt — 인증 정보 암호화 메서드
 */
export async function refreshSession(refreshed: AuthResponseType): Promise<string | null> {
  if (!refreshed) {
    await setCookie('session', '', 0);
    await setCookie('refresh-token', '', 0);
    await setCookie('auth-token', '', 0);
    return null;
  }
  const { userId, accessToken, refreshToken: newRefreshToken } = refreshed;
  const newExpiresAt = Date.now() + TOKEN_EXPIRY.SESSION;
  const sessionToken = await encrypt({ userId, expiresAt: newExpiresAt });

  await setCookie('session', sessionToken, TOKEN_EXPIRY.SESSION);
  await setCookie('refresh-token', newRefreshToken, TOKEN_EXPIRY.REFRESH);
  await setCookie('auth-token', accessToken, TOKEN_EXPIRY.ACCESS);

  return accessToken;
}
