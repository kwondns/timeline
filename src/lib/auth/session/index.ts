import { JWTPayload } from 'jose';

export * from './encrypt';
export * from './decrypt';
export * from './createSession';
export * from './verifySession';
export * from './refreshSession';
export * from './destroySession';

/**
 * @class SessionPayload
 * @description 사용자 세션 데이터를 표현하기 위한 인터페이스입니다.
 *
 * @property {string} userId — 사용자 고유 ID입니다. 각 사용자에 대해 고유해야 합니다.
 * @property {number} expiresAt — 세션 만료 시간을 나타냅니다. 밀리초 단위의 UNIX 타임스탬프입니다.
 *
 * @example
 * // SessionPayload 객체 예시
 * const session: SessionPayload = {
 *   userId: "12345",
 *   expiresAt: 1700000000000,
 * };
 *
 * @see https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.4 — JWT와 관련된 공식 문서를 참고하세요.
 */
export interface SessionPayload extends JWTPayload {
  /** 사용자 고유 ID */
  userId: string;
  /** 세션 만료 시간 (밀리초) */
  expiresAt: number;
}
export const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET);
