import { NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth/session';

/**
 * @function verifySessionInMiddleware
 * @description 클라이언트 요청에서 세션 쿠키를 확인한 뒤, 사용자 인증 상태를 검증합니다.
 *
 * @param {NextRequest} request — 사용자의 요청 객체입니다. 'session' 쿠키가 포함되어야 합니다.
 * @returns {Promise<{isAuth: boolean, userId: string, expiresAt?: number} | null>} —
 * 세션 정보와 함께 인증 상태를 반환합니다. 인증 실패 또는 세션 만료 시 null을 반환합니다.
 *
 * 반환 객체의 형식은 다음과 같습니다:
 * - `isAuth` (boolean): 인증 여부를 나타냅니다.
 * - `userId` (string): 인증된 사용자의 고유 ID입니다.
 * - `expiresAt` (number, 선택): 세션의 만료 시간(밀리초 단위)입니다. 선택적 값입니다.
 *
 * @throws {Error} — 세션 복호화 중 문제가 발생할 경우 예외가 발생할 수 있습니다.
 *
 * @example
 * // 요청에서 세션 검증 수행
 * import { verifySessionInMiddleware } from './session';
 *
 * async function middlewareHandler(req) {
 *   const sessionInfo = await verifySessionInMiddleware(req);
 *   if (sessionInfo?.isAuth) {
 *     console.log(`Authenticated User ID: ${sessionInfo.userId}`);
 *   } else {
 *     console.log('Authentication failed or session expired.');
 *   }
 * }
 *
 * @see https://nextjs.org/docs/api-reference/next/server#nextrequest — NextRequest API 문서
 * @see https://developer.mozilla.org/ko/docs/Web/API/Document/cookie — 쿠키 관련 문서
 */
export async function verifySessionInMiddleware(request: NextRequest): Promise<{
  isAuth: boolean;
  userId: string;
  expiresAt?: number;
} | null> {
  try {
    const sessionCookie = request.cookies.get('session')?.value;
    if (!sessionCookie) {
      return null;
    }

    const session = await decrypt(sessionCookie);
    if (!session?.userId) {
      return null;
    }

    // JWT exp는 초 단위, expiresAt는 밀리초 단위
    const nowSec = Math.floor(Date.now() / 1000);
    if (session.exp && session.exp <= nowSec) {
      return null;
    }

    return { isAuth: true, userId: session.userId, expiresAt: session.expiresAt };
  } catch (error) {
    return null;
  }
}
