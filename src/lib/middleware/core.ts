import { NextRequest, NextResponse } from 'next/server';
import { API_TIMEOUTS, TOKEN_EXPIRY } from '@/constants/TOKEN_TTL';

/**
 * @function shouldRefreshToken
 * @description 사용자의 인증 토큰과 세션 정보를 바탕으로 토큰 갱신이 필요한지 확인합니다.
 *
 * @param {NextRequest} request — 클라이언트 요청 객체로, `auth-token` 쿠키를 확인합니다. 필수입니다.
 * @param {Object} session — 현재 사용자 세션 정보 객체로, `expiresAt` 속성을 포함합니다. 필수입니다.
 * @param {number} [session.expiresAt] — 세션 만료 시간(타임스탬프)입니다. 선택적으로 제공됩니다.
 * @returns {Promise<boolean>} — 토큰 갱신이 필요한지 여부를 반환합니다. 갱신 필요 시 `true`, 그렇지 않으면 `false`를 반환합니다.
 *
 * @throws {Error} — 내부적인 문제로 인해 요청 객체 또는 세션 정보가 유효하지 않을 경우 발생할 수 있습니다.
 *
 * @example
 * // auth-token 쿠키가 없을 경우 갱신이 필요합니다.
 * const result = await shouldRefreshToken(request, { expiresAt: 1698787200000 });
 * console.log(result); // true
 *
 * @example
 * // 세션에 expiresAt이 존재하지 않을 경우 갱신이 필요합니다.
 * const result = await shouldRefreshToken(request, {});
 * console.log(result); // true
 *
 * @example
 * // 세션이 곧 만료될 경우 갱신이 필요합니다.
 * const now = Date.now();
 * const result = await shouldRefreshToken(request, { expiresAt: now + 1000 });
 * console.log(result); // true
 *
 * @example
 * // 세션이 충분히 유효하면 갱신이 필요하지 않습니다.
 * const now = Date.now();
 * const result = await shouldRefreshToken(request, { expiresAt: now + 3600000 });
 * console.log(result); // false
 *
 * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date
 */
export async function shouldRefreshToken(request: NextRequest, session: { expiresAt?: number }): Promise<boolean> {
  // 1. auth-token이 없으면 무조건 갱신 필요
  const authToken = request.cookies.get('auth-token')?.value;
  if (!authToken) {
    return true;
  }

  // 2. 세션 시간 기반 갱신 필요성 확인
  if (!session.expiresAt) {
    return true;
  }

  const now = Date.now();
  const timeLeft = session.expiresAt - now;

  return timeLeft <= TOKEN_EXPIRY.THRESHOLD;
}

/**
 * @function performTokenRefresh
 * @description 사용자 인증을 위해 토큰을 갱신합니다. 서버에 요청을 보내
 * 새로운 액세스 토큰과 리프레시 토큰을 반환받습니다.
 *
 * @param {NextRequest} request — 사용자 요청 객체입니다. "refresh-token" 쿠키가 포함되어야 합니다. (필수)
 * @returns {Promise<{success: boolean, newTokens?: {accessToken: string, refreshToken: string, userId: string}}>}
 * — token 갱신 성공 여부와 새로운 토큰 정보를 포함한 객체를 반환합니다.
 * "success"가 true인 경우 "newTokens" 객체에 새로운 토큰 정보가 담겨 있습니다.
 * "success"가 false인 경우 갱신에 실패했음을 나타냅니다.
 *
 * @throws {Error} — 요청 타임아웃(Api server 미응답) 혹은 네트워크 장애 등의 경우 발생할 수 있습니다.
 *
 * @example
 * // 토큰 갱신 성공 예시
 * const request = { cookies: { get: (key) => ({ value: 'exampleRefreshToken' }) } };
 * performTokenRefresh(request).then(response => {
 *   if (response.success) {
 *     console.log(response.newTokens.accessToken); // exampleAccessToken
 *   } else {
 *     console.log('토큰 갱신 실패');
 *   }
 * });
 *
 * @example
 * // 토큰 갱신 실패 예시 (쿠키 없음)
 * const request = { cookies: { get: (key) => undefined } };
 * performTokenRefresh(request).then(response => {
 *   console.log(response.success); // false
 * });
 *
 * @see https://developer.mozilla.org/ko/docs/Web/API/Request
 * @see https://developer.mozilla.org/ko/docs/Web/API/Response
 */
export async function performTokenRefresh(request: NextRequest): Promise<{
  success: boolean;
  newTokens?: {
    accessToken: string;
    refreshToken: string;
    userId: string;
  };
}> {
  const refreshToken = request.cookies.get('refresh-token')?.value;
  if (!refreshToken) {
    return { success: false };
  }

  if (!process.env.API_SERVER_URL) {
    return { success: false };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUTS.REFRESH);

  try {
    const refreshResult = await fetch(`${process.env.API_SERVER_URL}/user/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `refresh-token=${refreshToken}`,
      },
      signal: controller.signal,
    });

    if (!refreshResult.ok) return { success: false };

    const result = await refreshResult.json();
    if (!result.accessToken || !result.refreshToken || !result.userId) {
      return {
        success: false,
      };
    }

    return { success: true, newTokens: result };
  } catch (e) {
    return { success: false };
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * @function setCookieInResponse
 * @description HTTP 응답에 쿠키를 설정합니다. 지정된 키, 값, 유효 기간을 기반으로
 * 쿠키를 생성하여 응답 객체에 추가합니다.
 *
 * @param {NextResponse} response — 쿠키가 설정될 Next.js 응답 객체입니다. 필수 값입니다.
 * @param {string} key — 설정할 쿠키의 이름입니다. 필수 값입니다.
 * @param {string} value — 설정할 쿠키의 값입니다. 필수 값입니다.
 * @param {number} maxAgeMs — 쿠키의 유효 기간(밀리초 단위)입니다. 필수 값이며, 0 이상의 값을 입력해야 합니다.
 * @returns {void} — 반환값이 없습니다. 지정된 쿠키가 응답 객체에 설정됩니다.
 *
 * @throws {Error} — response, key, value, maxAgeMs 중 하나라도 유효하지 않을 경우 발생합니다.
 *
 * @example
 * // 예시 1: 쿠키를 응답에 설정하기
 * import { NextResponse } from 'next/server';
 *
 * const response = new NextResponse();
 * setCookieInResponse(response, 'userToken', 'abc123', 7 * 24 * 60 * 60 * 1000);
 *
 * @example
 * // 예시 2: 프로덕션 환경에서 사용 시 secure 옵션 활성화
 * process.env.NODE_ENV = 'production';
 * setCookieInResponse(response, 'sessionId', 'secureToken', 24 * 60 * 60 * 1000);
 *
 * @see https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Set-Cookie — Set-Cookie HTTP 헤더에 대한 참조 문서.
 * @see https://nextjs.org/docs — Next.js 공식 문서.
 */
export function setCookieInResponse(response: NextResponse, key: string, value: string, maxAgeMs: number) {
  // expires 방식으로 쿠키 설정 (더 안정적)
  const expires = new Date(Date.now() + maxAgeMs);

  response.cookies.set(key, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
}

/**
 * @function clearAuthCookies
 * @description 인증과 관련된 쿠키를 삭제하여 사용자의 인증 상태를 초기화합니다.
 *
 * @param {NextResponse} response — Next.js Response 객체로, 쿠키를 제어하기 위해 사용됩니다.
 *
 * @returns {void} — 반환값이 없습니다.
 *
 * @example
 * import { NextResponse } from 'next/server';
 * import { clearAuthCookies } from './auth-utils';
 *
 * export function logoutHandler(req: NextRequest) {
 *   const response = NextResponse.redirect('/login');
 *   clearAuthCookies(response);
 *   return response;
 * }
 *
 * @see https://nextjs.org/docs/api-reference/next/server#nextresponse
 */
export function clearAuthCookies(response: NextResponse) {
  ['session', 'auth-token', 'refresh-token'].forEach((cookie) => {
    response.cookies.set(cookie, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0), // 즉시 만료
      sameSite: 'lax',
      path: '/',
    });
  });
}
