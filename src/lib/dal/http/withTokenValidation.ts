import { ensureValidTokenForAction } from '@/lib/dal/action';
import { redirect } from 'next/navigation';

/**
 * @function withTokenValidation
 * @description 주어진 비동기 액션 실행 전에 토큰 유효성을 검증하고, 유효하지 않을 경우
 * 로그인이 필요한 페이지로 리디렉션합니다.
 *
 * @param {function} action — 토큰 검증 후 실행할 비동기 함수입니다.
 * 해당 함수는 입력 인자 T를 받아 Promise 형태의 결과 R을 반환합니다.
 * @returns {function} — 토큰 유효성 검증을 포함하여 실행할 새 비동기 함수입니다.
 * 입력값 T를 받아 결과로 Promise<R>을 반환합니다.
 *
 * @throws {Error} — ensureValidTokenForAction 호출 중 에러가 발생할 경우 에러를 throw합니다.
 *
 * @example
 * // 기존 함수 정의
 * async function fetchUserData(userId) {
 *   return await api.get(`/user/${userId}`);
 * }
 *
 * // 토큰 유효성을 검증한 함수 생성
 * const validatedFetchUserData = withTokenValidation(fetchUserData);
 *
 * // 호출 시 유효한 토큰이 없으면 리디렉션 처리
 * validatedFetchUserData(123)
 *   .then(data => console.log(data))
 *   .catch(error => console.error(error));
 *
 * @see ensureValidTokenForAction
 * @see redirect
 */
export function withTokenValidation<T extends unknown[], R>(
  action: (...args: T) => Promise<R>,
): (...args: T) => Promise<R> {
  return async (...args: T) => {
    const { success } = await ensureValidTokenForAction();

    if (!success) {
      redirect('/sign/in?toast=loginRequired');
    }
    return await action(...args);
  };
}
