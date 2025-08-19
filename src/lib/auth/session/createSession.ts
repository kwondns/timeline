'use server';

import { encrypt } from '@/lib/auth/session/encrypt';
import { setCookie } from '@/lib/auth/cookie';

/**
 * @function createSession
 * @description 사용자의 세션을 생성하고 해당 세션을 쿠키에 저장합니다.
 *
 * @param {string} userId — 세션을 생성할 사용자의 고유 식별자입니다. 필수 값입니다.
 * @returns {Promise<void>} — 세션이 성공적으로 생성되고 쿠키에 저장되었을 경우 반환합니다.
 * @throws {Error} — 세션 암호화 또는 쿠키 저장 중 에러가 발생할 경우 발생합니다.
 *
 * @example
 * // 특정 사용자의 세션 생성
 * await createSession('user123');
 *
 * @see encrypt — 세션 값을 암호화하는 함수입니다.
 * @see setCookie — 쿠키에 데이터를 저장하는 함수입니다.
 */
export async function createSession(userId: string) {
  const expiresAt = 1000 * 60 * 60;
  const session = await encrypt({ userId, expiresAt: Date.now() + expiresAt });
  await setCookie('session', session, expiresAt);
}
