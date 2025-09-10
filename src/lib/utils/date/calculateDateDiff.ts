import { formattingDateDiff } from '@/lib/utils/date/formattingDateDiff';
import { differenceInMinutes } from 'date-fns/differenceInMinutes';
import { Locale } from '@/i18n/routing';

export function calculateDateDiff(
  startDate: string | Date,
  endDate?: string | Date,
  toNumber?: false,
  locale?: Locale,
): string;
export function calculateDateDiff(
  startDate: string | Date,
  endDate?: string | Date,
  toNumber?: true,
  locale?: never,
): number;
/**
 * @function calculateDateDiff
 * @description 두 날짜 간의 차이를 계산하여 문자열 또는 숫자로 반환합니다.
 *
 * @param {string | Date} startDate — 시작 날짜입니다. 문자열(ISO 형식) 또는 Date 객체로 입력받을 수 있습니다. 필수 입력입니다.
 * @param {string | Date} [endDate] — 종료 날짜입니다. 문자열(ISO 형식) 또는 Date 객체로 입력받을 수 있으며, 입력하지 않은 경우 현재 날짜로 간주합니다. 선택 입력입니다.
 * @param {boolean} [toNumber=false] — 결과를 숫자로 반환할지 여부를 결정합니다. 기본값은 false입니다. 선택 입력입니다.
 * @param {Locale} [locale] — 날짜 차이를 문자열로 포맷팅할 때 사용할 로케일을 지정합니다. 기본값은 'ko'(한국어)입니다. 선택 입력입니다.
 *
 * @returns {string | number} — 날짜 차이를 포맷팅한 문자열(기본값) 또는 숫자(분 단위)로 반환합니다.
 *
 * @throws {TypeError} — startDate가 유효하지 않은 경우 발생합니다. (예: 잘못된 형식의 문자열 입력)
 * @throws {TypeError} — endDate가 유효하지 않은 경우 발생합니다. (예: 잘못된 형식의 문자열 입력)
 *
 * @example
 * // 두 날짜 간의 차이를 분 단위로 숫자로 반환 (toNumber=true)
 * calculateDateDiff('2023-10-01T00:00:00', '2023-10-01T01:30:00', true); // 90
 *
 * @example
 * // 두 날짜 간의 차이를 포맷팅된 문자열로 반환
 * calculateDateDiff('2023-10-01T00:00:00', '2023-10-01T01:30:00'); // "1시간 30분"
 *
 * @example
 * // 시작 날짜만 입력한 경우 종료 날짜는 현재 날짜로 간주
 * calculateDateDiff('2023-10-01T00:00:00'); // 현재 시간 기준 차이 반환
 *
 * @example
 * // 로케일을 설정하여 결과를 반환
 * calculateDateDiff('2023-10-01T00:00:00', '2023-10-01T01:30:00', false, 'en'); // "1 hour 30 minutes"
 *
 * @see https://date-fns.org/v2.29.2/docs/differenceInMinutes
 * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date
 */
export function calculateDateDiff(
  startDate: string | Date,
  endDate?: string | Date,
  toNumber: boolean = false,
  locale?: Locale,
): string | number {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  let end: Date;
  if (typeof endDate === 'string') {
    end = endDate ? new Date(endDate) : new Date();
  } else {
    end = endDate ?? new Date();
  }
  const diffMinute = differenceInMinutes(end, start);
  return toNumber ? differenceInMinutes(end, start) : formattingDateDiff(diffMinute, locale ?? 'ko');
}
