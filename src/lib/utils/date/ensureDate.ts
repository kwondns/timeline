/**
 * @function ensureDate
 * @description 문자열 또는 Date 객체를 입력받아 Date 객체로 변환합니다.
 *
 * @param {string | Date} date — 변환할 날짜입니다.
 * 문자열 형식일 경우 "YYYY-MM-DD" 또는 "MM/DD/YYYY"와 같은 유효한 날짜 포맷이어야 하며,
 * Date 객체일 경우 그대로 반환됩니다.
 *
 * @returns {Date} — 주어진 입력을 Date 객체로 변환하여 반환합니다.
 *
 * @throws {TypeError} — 입력값이 문자열 또는 Date 객체가 아닌 경우 발생합니다.
 * @throws {RangeError} — 문자열이 유효한 날짜 포맷이 아니거나 파싱할 수 없는 경우 발생합니다.
 *
 * @example
 * // 문자열을 Date 객체로 변환
 * makeDateObject('2023-10-25'); // Date 객체 반환
 *
 * @example
 * // 이미 Date 객체인 경우 반환
 * const date = new Date('2023-10-25');
 * makeDateObject(date); // 동일한 Date 객체 반환
 *
 * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date
 */
export const ensureDate = (date: string | Date): Date => {
  return typeof date === 'string' ? new Date(date) : date;
};
