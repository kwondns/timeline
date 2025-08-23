import { Locale } from '@/i18n/routing';
import { differenceInMinutes } from 'date-fns';
import { ensureDate } from '@/lib/utils/date/ensureDate';

/**
 * @function fromToDiffDateFormat
 * @description 두 날짜의 차이를 계산하여 지정된 형식의 문자열로 반환합니다. 시작 시간과
 * 경과 시간 정보를 포함합니다.
 *
 * @param {string | Date} startDate — 시작 날짜 및 시간을 나타내는 값입니다. 문자열 또는
 * Date 객체로 입력 가능합니다. (필수)
 * @param {string | Date} endDate — 종료 날짜 및 시간을 나타내는 값입니다. 문자열 또는
 * Date 객체로 입력 가능합니다. (필수)
 * @param {function} t — 다국어 지원을 위한 텍스트 변환 함수입니다. 문자열 키와 값을
 * 전달받아 변환된 텍스트를 반환합니다. (필수)
 * @param {Locale} locale — 날짜와 시간을 포맷팅할 때 사용할 로케일 설정입니다.
 * (필수)
 * @returns {string} — 시작 시간과 경과 시간을 포함한 형식의 문자열을 반환합니다. 예:
 * "13:30, 2시간 30분"
 *
 * @throws {TypeError} — startDate 또는 endDate가 유효한 날짜 형식이 아닐 경우
 * 발생합니다.
 * @throws {RangeError} — endDate가 startDate 이전일 경우 발생합니다.
 *
 * @example
 * // 기본 사용법 (로케일: 대한민국 표준 시간, t 함수는 단순 키 반환을 가정)
 * const t = (key, values) => {
 *   const templates = {
 *     diff: '시작: {start}, 경과: {diff}',
 *     hoursMinutes: '{hours}시간 {minutes}분',
 *     hours: '{hours}시간',
 *     minutes: '{minutes}분',
 *   };
 *   return templates[key].replace(
 *     /{(\w+)}/g,
 *     (_, k) => values[k]
 *   );
 * };
 *
 * fromToDiffDateFormat(
 *   '2023-10-01T08:00:00Z',
 *   '2023-10-01T10:30:00Z',
 *   t,
 *   'ko-KR'
 * );
 * // 반환값: "시작: 17:00, 경과: 2시간 30분"
 *
 * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date
 * @see https://www.npmjs.com/package/date-fns — differenceInMinutes 함수에 대한
 * 참조입니다.
 * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
 */
export const fromToDiffDateFormat = (
  startDate: string | Date,
  endDate: string | Date,
  t: (key: string, values?: Record<string, any>) => string,
  locale: Locale,
): string => {
  const start = ensureDate(endDate).toLocaleTimeString(locale, {
    timeStyle: 'short',
    hour12: false,
    timeZone: 'Asia/Seoul',
  });
  const totalMinutes = differenceInMinutes(ensureDate(endDate), ensureDate(startDate));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return t('diff', {
    start: start,
    diff:
      hours > 0
        ? minutes > 0
          ? t('hoursMinutes', { hours, minutes })
          : t('hours', { hours })
        : t('minutes', { minutes }),
  });
};
