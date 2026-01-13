'use server';

import { performTokenRefreshForActionWrapper, shouldRefreshTokenForActionWrapper } from '@/lib/dal/action/coreWrapper';

/**
 * 서버 액션에서 토큰 갱신이 필요한지 확인하는 함수
 * @description auth-token의 존재 여부, 세션 유효성, 만료 시간을 확인하여 갱신 필요성을 판단합니다.
 * @returns {Promise<boolean>} 토큰 갱신이 필요한 경우 true, 그렇지 않으면 false
 * @example
 * ```typescript
 * const needsRefresh = await shouldRefreshTokenForAction();
 * if (needsRefresh) {
 *   // 토큰 갱신 로직 실행
 * }
 * ```
 */
export async function shouldRefreshTokenForAction(): Promise<boolean> {
  return shouldRefreshTokenForActionWrapper()();
}

/**
 * 서버 액션에서 토큰 갱신을 수행하는 함수
 * @description refresh token을 사용하여 새로운 access token과 세션을 생성합니다.
 * @returns {Promise<{success: boolean, userId?: string, accessToken?: string, error?: string}>} 갱신 결과 객체
 * @example
 * ```typescript
 * const result = await performTokenRefreshForAction();
 * if (result.success) {
 *   console.log('갱신 성공:', result.userId, result.accessToken);
 * } else {
 *   console.error('갱신 실패:', result.error);
 * }
 * ```
 */
export async function performTokenRefreshForAction(): Promise<{
  success: boolean;
  userId?: string;
  accessToken?: string;
  error?: string;
}> {
  return await performTokenRefreshForActionWrapper()();
}
