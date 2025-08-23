'use server';

import { performTokenRefreshForAction, shouldRefreshTokenForAction } from '@/lib/dal/action/core';
import { verifySession } from '@/lib/auth/session';
import { cookies } from 'next/headers';
import { Locale } from '@/i18n/routing';

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
  locale: Locale;
  userId?: string;
  accessToken?: string;
}> {
  const locale: Locale = ((await cookies()).get('NEXT_LOCALE')?.value as Locale) ?? 'ko';
  try {
    // 토큰 갱신 필요성 확인
    const needsRefresh = await shouldRefreshTokenForAction();

    if (!needsRefresh) {
      // 갱신 불필요 시 현재 세션에서 userId 반환
      const session = await verifySession();
      return {
        success: true,
        userId: session?.userId,
        locale: locale,
      };
    }

    // 토큰 갱신 시도
    const refreshResult = await performTokenRefreshForAction();

    if (!refreshResult.success) {
      return { success: false, locale };
    }

    return {
      success: true,
      locale,
      userId: refreshResult.userId,
      accessToken: refreshResult.accessToken,
    };
  } catch (error) {
    return { success: false, locale };
  }
}
