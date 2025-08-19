'use server';

import { SignJWT } from 'jose';
import { encodedKey, SessionPayload } from '@/lib/auth/session/index';

/**
 * @function encrypt
 * @description 주어진 SessionPayload 데이터를 기반으로 JWT(JSON Web Token)를 생성합니다.
 *
 * @param {SessionPayload} payload — JWT의 페이로드로 사용할 데이터 객체입니다. 필수 입력 값입니다.
 * @returns {Promise<string>} — HS256 알고리즘으로 서명된 JWT 토큰 문자열을 반환합니다.
 * @throws {Error} — JWT 토큰 생성 중 문제가 발생할 경우 오류가 발생합니다.
 *
 * @example
 * // SessionPayload 객체를 기반으로 JWT 토큰 생성
 * const payload = { userId: '12345', role: 'admin' };
 * const token = await encrypt(payload);
 * console.log(token); // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *
 * @see https://datatracker.ietf.org/doc/html/rfc7519 — JSON Web Token (JWT) 표준 문서.
 * @see https://github.com/panva/jose — 사용된 jose 라이브러리 공식 문서.
 */
export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(encodedKey);
}
