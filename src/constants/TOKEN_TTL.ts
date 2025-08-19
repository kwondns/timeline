export const TOKEN_EXPIRY = {
  SESSION: 1000 * 60 * 60, // 1시간
  ACCESS: 1000 * 60 * 15, // 15분
  REFRESH: 1000 * 60 * 60 * 24 * 7, // 7일
  THRESHOLD: 47 * 60 * 1000, // 47분 (갱신 임계값)
} as const;

export const API_TIMEOUTS = {
  DEFAULT: 10000, // 10초
  REFRESH: 5000, // 5초 (토큰 갱신)
} as const;
