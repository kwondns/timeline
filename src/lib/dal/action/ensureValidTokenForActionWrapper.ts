import { performTokenRefreshForAction, shouldRefreshTokenForAction } from '@/lib/dal/action/core';
import { verifySession } from '@/lib/auth/session';
import { cookies } from 'next/headers';
import { Locale } from '@/i18n/routing';
import { pipe } from 'fp-ts/function';
import { getLocaleTask } from '@/lib/auth/cookie';
import * as TE from 'fp-ts/TaskEither';

export async function ensureValidTokenForActionWrapper(): Promise<{
  success: boolean;
  locale: Locale;
  userId?: string;
  accessToken?: string;
}> {
  pipe(TE.Do, TE.bind('locale', pipe(getLocaleTask, TE.fromTask)));
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
