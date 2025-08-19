import { formattingDateDiff } from '@/lib/utils/date/formattingDateDiff';

/**
 * @function calculateDateDiff
 * @description 두 날짜 사이의 차이를 계산하여 분 단위 또는 사용자 친화적인 형식으로 반환합니다.
 *
 * @param {string | Date} startDate — 시작 날짜입니다. 문자열 또는 Date 객체 형식으로 입력받습니다. 필수 값입니다.
 * @param {string | Date} [endDate] — 종료 날짜입니다. 문자열 또는 Date 객체 형식으로 입력받습니다. 선택 값이며, 기본값은 현재 시간입니다.
 * @param {boolean} [toNumber=false] — 결과를 숫자(분 단위)로 반환할지 여부를 결정합니다. 기본값은 `false`입니다.
 * @returns {number | string} — `toNumber`가 `true`면 분 단위의 숫자를 반환하고, `false`면 사용자 친화적인 형식의 문자열을 반환합니다.
 * @throws {TypeError} — `startDate` 혹은 `endDate`가 유효한 날짜 형식이 아닐 경우 발생합니다.
 *
 * @example
 * // 두 날짜 사이의 차이를 사용자 친화적 형식으로 반환
 * calculateDateDiff('2023-10-10', '2023-10-11'); // 예: "1일 0시간 0분"
 *
 * @example
 * // 현재 시간과 특정 날짜 사이의 차이를 분 단위로 반환
 * calculateDateDiff('2023-10-10', undefined, true); // 예: 1440
 *
 * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date
 * @see https://date-fns.org/ (날짜 계산이 필요한 경우 유용한 라이브러리)
 */
export function calculateDateDiff(startDate: string | Date, endDate?: string | Date, toNumber?: false): string;
export function calculateDateDiff(startDate: string | Date, endDate?: string | Date, toNumber?: true): number;
export function calculateDateDiff(startDate: string | Date, endDate?: string | Date, toNumber: boolean = false) {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const diffMinute = (end.getTime() - start.getTime()) / 60 / 1000;
  if (toNumber) return diffMinute;
  return formattingDateDiff(diffMinute);
}
