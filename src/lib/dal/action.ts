'use server';

import { cookies } from 'next/headers';
import { verifySession, refreshSession } from '@/lib/auth/session';
import { refresh } from '@/lib/auth/token';
import { TOKEN_EXPIRY } from '@/constants/TOKEN_TTL';

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
 * @returns {Promise<{success: boolean, userId?: string, accessToken?: string}>}
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
