'use server';

import { cookies } from 'next/headers';
import { decrypt } from '@/lib/auth/session/decrypt';
import { TOKEN_EXPIRY } from '@/constants/TOKEN_TTL';

/**
 * @function verifySession
 * @description 사용자 세션의 유효성을 검증하고 인증 상태 및 세션 정보를 반환합니다.
 *
 * @returns {Promise<{ isAuth: boolean; userId: string; expiresAt: number } | null>}
 * — 세션이 유효한 경우 인증 상태(isAuth), 사용자 ID(userId), 세션 만료 시간(expiresAt)을
 * 포함한 객체를 반환하며, 만료되었거나 유효하지 않은 경우 null을 반환합니다.
 *
 * @throws {Error} — `cookies()` 호출이나 `decrypt()` 함수 수행 중 오류가 발생할 경우 예외를 던집니다.
 *
 * @example
 * // 세션이 유효한 경우
 * const sessionInfo = await verifySession();
 * if (sessionInfo) {
 *   console.log(sessionInfo.isAuth); // true
 *   console.log(sessionInfo.userId); // 사용자 ID 출력
 * }
 *
 * @example
 * // 세션이 유효하지 않은 경우
 * const sessionInfo = await verifySession();
 * if (!sessionInfo) {
 *   console.log('세션이 만료되었거나 유효하지 않습니다.');
 * }
 *
 * @see https://developer.mozilla.org/ko/docs/Web/API/Document/cookie — 쿠키에 대한 추가 참고 자료
 * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise — Promise에 대한 자료
 */
export async function verifySession(): Promise<{ isAuth: boolean; userId: string; expiresAt: number } | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('session')?.value;
  let session = await decrypt(cookie);
  if (!session?.userId) return null;

  const now = Date.now();
  const timeLeft = session.expiresAt - now;

  if (timeLeft > TOKEN_EXPIRY.THRESHOLD) {
    return { isAuth: true, userId: session.userId, expiresAt: session.expiresAt };
  }

  return null;
}
