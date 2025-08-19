'use server';

import { cookies } from 'next/headers';
import { verifySession, refreshSession } from '@/lib/auth/session';
import { refresh } from '@/lib/auth/token';
import { TOKEN_EXPIRY } from '@/constants/TOKEN_TTL';

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
async function shouldRefreshTokenForAction(): Promise<boolean> {
  try {
    // 1. auth-token이 없으면 갱신 필요
    const cookieStore = await cookies();
    const authToken = cookieStore.get('auth-token')?.value;
    if (!authToken) {
      return true;
    }

    // 2. 세션 검증
    const session = await verifySession();
    if (!session) {
      return true;
    }

    // 3. 세션 시간 확인
    const now = Date.now();
    const timeLeft = session.expiresAt - now;

    if (timeLeft <= TOKEN_EXPIRY.THRESHOLD) {
      return true;
    }

    return false;
  } catch (error) {
    return true; // 에러 시 갱신 시도
  }
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
async function performTokenRefreshForAction(): Promise<{
  success: boolean;
  userId?: string;
  accessToken?: string;
  error?: string;
}> {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh-token')?.value;

    if (!refreshToken) {
      return { success: false, error: 'No refresh token' };
    }

    const result = await refresh(refreshToken);
    if (!result) {
      return { success: false, error: 'Refresh API failed' };
    }

    // 세션 갱신
    const session = await refreshSession(result);
    if (!session) {
      return { success: false, error: 'Session refresh failed' };
    }

    return { success: true, userId: result.userId, accessToken: result.accessToken };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
}

/**
 * 서버 액션에서 사용할 토큰 검증/갱신 함수
 * @description 현재 토큰이 유효한지 확인하고, 필요시 자동으로 갱신을 수행합니다.
 * 토큰이 유효하거나 갱신에 성공하면 userId와 accessToken을 반환합니다.
 * @returns {Promise<{success: boolean, userId?: string, accessToken?: string}>} 검증/갱신 결과
 * @example
 * ```typescript
 * const tokenResult = await ensureValidTokenForAction();
 * if (tokenResult.success) {
 *   // 인증이 필요한 작업 수행
 *   const { userId, accessToken } = tokenResult;
 * } else {
 *   // 로그인 페이지로 리다이렉트
 *   redirect('/sign/in');
 * }
 * ```
 */

export async function ensureValidTokenForAction(): Promise<{
  success: boolean;
  userId?: string;
  accessToken?: string;
}> {
  try {
    // 토큰 갱신 필요성 확인
    const needsRefresh = await shouldRefreshTokenForAction();

    if (!needsRefresh) {
      // 갱신 불필요 시 현재 세션에서 userId 반환
      const session = await verifySession();
      return {
        success: true,
        userId: session?.userId,
      };
    }

    // 토큰 갱신 시도
    const refreshResult = await performTokenRefreshForAction();

    if (!refreshResult.success) {
      return { success: false };
    }

    return {
      success: true,
      userId: refreshResult.userId,
      accessToken: refreshResult.accessToken,
    };
  } catch (error) {
    return { success: false };
  }
}
