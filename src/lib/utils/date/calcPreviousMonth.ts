/**
 * @function calcPreviousMonth
 * @description 주어진 날짜(date)와 기준 첫 번째 일(day)을 기준으로 이전 달의
 * 특정 날짜를 계산합니다.
 *
 * @param {Date} date — 기준이 되는 현재 날짜입니다. 반드시 유효한 Date 객체여야 합니다.
 * @param {number} firstDay — 기준으로 사용하는 첫 번째 날짜입니다.
 * 1 이상의 정수를 입력해야 합니다.
 * @returns {Date} — 계산된 이전 달의 특정 날짜를 Date 객체로 반환합니다.
 *
 * @throws {TypeError} — date가 유효한 Date 객체가 아니거나 firstDay가 숫자가 아닐 경우
 * 발생합니다.
 * @throws {RangeError} — firstDay가 1 미만인 경우 발생합니다.
 *
 * @example
 * // 현재 날짜를 기준으로, 이전 달에서 기준 첫 번째 날을 설정
 * const date = new Date(2023, 9, 15); // 2023년 10월 15일 (월은 0부터 시작)
 * const result = calcPreviousMonth(date, 5);
 * console.log(result); // 2023년 9월 5일 반환
 *
 * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date
 */
export const calcPreviousMonth = (date: Date, firstDay: number): Date =>
  new Date(date.getFullYear(), date.getMonth(), -firstDay + 1);

