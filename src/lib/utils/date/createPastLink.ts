/**
 * @function createPastLink
 * @description 특정 날짜와 선택적 index를 기반으로 과거 링크를 생성합니다.
 *
 * @param {string} date — 기준이 되는 날짜의 문자열입니다. 반드시 ISO 8601 형식이어야 합니다.
 * @param {string} [index='0'] — 쿼리 파라미터로 추가될 index 값입니다. 기본값은 '0'이며 이 경우 index가 포함되지 않습니다.
 * @returns {string} — 입력된 날짜와 index를 기반으로 생성된 링크 문자열을 반환합니다.
 *
 * @example
 * // index는 기본값('0')으로 설정
 * createPastLink('2023-10-05');
 * // 결과: "/past/2023-10-05"
 *
 * @example
 * // index에 유효한 값을 전달
 * createPastLink('2023-10-05', '2');
 * // 결과: "/past/2023-10-05?index=2"
 *
 * @throws {TypeError} — date 매개변수가 유효한 날짜 형식이 아닐 경우 발생합니다.
 *
 * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date
 */
export const createPastLink = (date: string, index: string = '0'): string => {
  const count = index === '0' ? '' : `?index=${index}`;

  return `/past/${new Date(new Date(date).getTime() + 9 * 1000 * 60 * 60).toISOString().slice(0, 10)}${count}`;
};
