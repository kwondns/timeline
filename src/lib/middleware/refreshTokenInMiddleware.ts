import { NextRequest, NextResponse } from 'next/server';
import { TOKEN_EXPIRY } from '@/constants/TOKEN_TTL';
import {
  clearAuthCookies,
  performTokenRefresh,
  setCookieInResponse,
  setUserIdHeader,
  shouldRefreshToken,
} from '@/lib/middleware/core';
import { verifySessionInMiddleware } from '@/lib/middleware/verifySessionInMiddleware';

/**
 * @function refreshTokenInMiddleware
 * @description 주어진 요청을 기반으로 사용자의 세션을 검증하고, 필요 시
 *              인증 토큰을 갱신합니다. 갱신 결과 및 새로운 세션 정보를 반환합니다.
 *
 * @param {NextRequest} request — 사용자의 요청 객체입니다. 인증 및 세션 검증을 위해 필요합니다.
 * @returns {Promise<{ success: boolean, session: { isAuth: boolean, userId: string, expiresAt?: number } | null, response?: NextResponse }>} —
 *          성공 여부(success), 갱신된 세션 정보(session), 그리고 응답 객체(response)를 포함하는 객체를 반환합니다.
 *          response는 쿠키 변경 등 클라이언트 상태 갱신이 필요한 경우 포함됩니다.
 *
 * @throws {Error} — 내부 오류가 발생한 경우 또는 의존 함수(`verifySessionInMiddleware`, `performTokenRefresh`) 호출 중 에러 발생 시 예외를 던집니다.
 *
 * @example
 * // 세션 유효성 검증과 토큰 갱신 처리
 * const result = await refreshTokenInMiddleware(req);
 * if (result.success) {
 *   console.log('새로운 세션:', result.session);
 * } else {
 *   console.log('토큰 갱신 실패:', result.response);
 * }
 *
 * @see verifySessionInMiddleware — 세션 정보를 검증하는 함수입니다.
 * @see performTokenRefresh — 토큰 갱신을 담당하는 함수입니다.
 * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise
 */
export async function refreshTokenInMiddleware(
  request: NextRequest,
  response: NextResponse,
): Promise<{
  success: boolean;
  session: { isAuth: boolean; userId: string; expiresAt?: number } | null;
  response?: NextResponse;
}> {
  try {
    const session = await verifySessionInMiddleware(request);

    if (!session) {
      return { success: false, session: null };
    }

    // auth-token 존재 여부와 세션 시간을 함께 고려하여 갱신 필요성 확인
    const needsRefresh = await shouldRefreshToken(request, session);
    if (!needsRefresh) {
      setUserIdHeader(response, session.userId);
      return { success: true, session, response };
    }

    // 토큰 갱신 수행
    const refreshResult = await performTokenRefresh(request);

    if (!refreshResult.success || !refreshResult.newTokens) {
      // 갱신 실패 시 세션 무효화
      const response = NextResponse.next();
      clearAuthCookies(response);

      return { success: false, session: null, response };
    }

    // 새로운 세션과 토큰 생성
    const { accessToken, refreshToken, userId } = refreshResult.newTokens;
    const newExpiresAt = Date.now() + TOKEN_EXPIRY.SESSION;

    // 새 세션 토큰 생성
    const { encrypt } = await import('@/lib/auth/session');
    const sessionToken = await encrypt({ userId, expiresAt: newExpiresAt });

    // 응답에 새 쿠키 설정
    setCookieInResponse(response, 'session', sessionToken, TOKEN_EXPIRY.SESSION);
    setCookieInResponse(response, 'auth-token', accessToken, TOKEN_EXPIRY.ACCESS);
    setCookieInResponse(response, 'refresh-token', refreshToken, TOKEN_EXPIRY.REFRESH);

    setUserIdHeader(response, userId);

    // 갱신 성공 시 새로운 세션 정보 반환
    const newSession = { isAuth: true, userId, expiresAt: newExpiresAt };
    return { success: true, session: newSession, response };
  } catch (error) {
    return { success: false, session: null };
  }
}
