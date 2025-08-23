import { Locale, LOCALE, routing } from '@/i18n/routing';

/**
 * @function getLocale
 * @description 주어진 경로명(pathname)에서 유효한 로케일(locale)을 추출합니다.
 * 유효한 로케일이 없을 경우 기본 로케일을 반환합니다.
 *
 * @param {string} pathname — URL 경로명입니다. '/'로 구분된 문자열 형식을 사용합니다.
 * 해당 경로에서 로케일 정보가 포함되어 있는지 확인합니다.
 * @returns {string} — 발견된 유효한 로케일 값(예: 'en', 'ko')을 반환하거나,
 * 유효하지 않을 경우 기본 로케일('ko)을 반환합니다.
 *
 * @example
 * // 유효한 로케일이 포함된 경로명일 경우
 * const locale = getLocale('/ko/home');
 * console.log(locale); // 'ko'
 *
 * @example
 * // 유효한 로케일이 포함되지 않은 경로명일 경우
 * const locale = getLocale('/home');
 * console.log(locale); // routing.defaultLocale (예: 'en')
 *
 * @throws {Error} — LOCALE 배열이나 routing.defaultLocale이 올바르게 정의되어 있지
 * 않을 경우 사용 도중 문제가 발생할 가능성이 있습니다.
 *
 * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/split
 */
export function getLocale(pathname: string) {
  const parts = pathname.split('/');
  const maybeLocale = parts[1];
  if (LOCALE.includes(maybeLocale as Locale)) {
    return maybeLocale;
  }
  return routing.defaultLocale;
}

/**
 * @function stripLocale
 * @description URL 경로에서 언어 설정(locale)을 제거하여 반환합니다.
 *
 * @param {string} pathname — 입력된 URL 경로 문자열입니다. 경로는 '/'로 구분됩니다.
 * @returns {string} — 언어 설정이 제거된 URL 경로 문자열을 반환합니다. 언어 설정이 없을 경우 원본 경로를 반환합니다.
 *
 * @example
 * // 언어 설정이 포함된 경로
 * stripLocale('/en/about'); // '/about'
 *
 * @example
 * // 언어 설정이 없는 경로
 * stripLocale('/about'); // '/about'
 *
 * @example
 * // 기본 경로 (루트)
 * stripLocale('/en/'); // '/'
 *
 * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/split
 */
export function stripLocale(pathname: string) {
  const parts = pathname.split('/');
  const maybeLocale = parts[1];
  if (LOCALE.includes(maybeLocale as Locale)) {
    return '/' + parts.slice(2).join('/') || '/';
  }
  return pathname;
}
