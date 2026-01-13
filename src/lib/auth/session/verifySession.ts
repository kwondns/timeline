'use server';

import { TOKEN_EXPIRY } from '@/constants/TOKEN_TTL';
import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import * as O from 'fp-ts/Option';
import { getSessionTask } from '@/lib/auth/cookie';
import { sessionDecryptWrapper } from '@/lib/auth/session/sessionDecryptWrapper';
import { SessionPayload } from '@/lib/auth/session/index';
import { verifySessionWrapper } from '@/lib/auth/session/verifySessionWrapper';

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
  return verifySessionWrapper()();
}
