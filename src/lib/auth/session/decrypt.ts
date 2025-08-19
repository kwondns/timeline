'use server';

import { encodedKey, SessionPayload } from '@/lib/auth/session/index';
import { jwtVerify } from 'jose';

/**
 * @function decrypt
 * @description 주어진 세션 문자열을 디코드하고 이를 검증하여 페이로드를 반환합니다.
 *
 * @param {string | undefined} [session=''] — 복호화할 세션 토큰 문자열입니다.
 * 빈 문자열이 기본값이며, undefined일 경우에도 처리됩니다.
 * @returns {Promise<SessionPayload | null>} — 복호화 및 검증된 세션 페이로드를 반환합니다.
 * 유효하지 않은 토큰일 경우 null을 반환합니다.
 * @throws {Error} — jwtVerify 함수 실행 중 오류 발생 시 예외가 발생합니다.
 *
 * @example
 * // 유효한 세션 문자열
 * decrypt('validSessionToken').then((payload) => {
 *   console.log(payload); // 복호화된 SessionPayload 객체
 * });
 *
 * @example
 * // 유효하지 않은 세션 문자열
 * decrypt('invalidSessionToken').then((payload) => {
 *   console.log(payload); // null
 * });
 *
 * @see https://github.com/auth0/node-jose
 * @see https://www.npmjs.com/package/jose
 */
export async function decrypt(session: string | undefined = ''): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, { algorithms: ['HS256'] });
    return payload as SessionPayload;
  } catch (e) {
    return null;
  }
}
