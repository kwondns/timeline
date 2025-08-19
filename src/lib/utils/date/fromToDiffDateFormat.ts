import { calculateDateDiff } from '@/lib/utils/date/calculateDateDiff';

/**
 * @function fromToDiffDateFormat
 * @description 두 날짜 간의 차이를 계산하고 시작 시간을 포맷하여 문자열로 반환합니다.
 *
 * @param {string | Date} startDate — 시작 날짜입니다. 문자열 또는 Date 객체로 입력 가능합니다.
 * @param {string | Date} endDate — 종료 날짜입니다. 문자열 또는 Date 객체로 입력 가능합니다.
 * @returns {string} — 시작 시간을 포맷한 문자열과 두 날짜 간의 차이를 함께 반환합니다.
 *
 * @throws {TypeError} — startDate나 endDate가 날짜 형식이 아니거나 유효하지 않은 경우 발생합니다.
 *
 * @example
 * // 날짜 차이를 계산하고 포맷된 문자열 반환
 * fromToDiffDateFormat('2023-03-01T12:00:00', '2023-03-01T14:30:00');
 * // 결과: "12:00 부터 2시간 30분"
 *
 * @example
 * // Date 객체를 이용하는 경우
 * fromToDiffDateFormat(new Date('2023-03-01T08:00:00'), new Date('2023-03-01T10:15:00'));
 * // 결과: "08:00 부터 2시간 15분"
 *
 * @see calculateDateDiff — 두 날짜 간의 차이를 계산하는 내부 함수
 */
export const fromToDiffDateFormat = (startDate: string | Date, endDate: string | Date): string => {
  const diff = calculateDateDiff(startDate, endDate);
  const start = new Date(startDate).toLocaleTimeString('ko-KR', { timeStyle: 'short', hour12: false });
  return `${start} 부터 ${diff}`;
};
