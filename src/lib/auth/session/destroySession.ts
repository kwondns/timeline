'use server';

import { cookies } from 'next/headers';

/**
 * @function destroySession
 * @description 사용자 세션과 관련된 쿠키를 삭제하여 사용자의 인증 상태를 해제합니다.
 *
 * @returns {Promise<void>} — 세션 삭제 작업이 성공적으로 완료되었을 경우 반환됩니다.
 *
 * @throws {Error} — 쿠키 삭제 작업 중 오류가 발생할 경우 예외를 발생시킵니다.
 *
 * @example
 * // 세션 삭제 사용 예시
 * await destroySession();
 * console.log('사용자 세션이 성공적으로 삭제되었습니다.');
 *
 * @see https://developer.mozilla.org/ko/docs/Web/API/CookieStore — CookieStore API에 대한 문서를 참조하십시오.
 */

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  cookieStore.delete('auth-token');
  cookieStore.delete('refresh-token');
}
