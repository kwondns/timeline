/**
 * @function formattingDateDiff
 * @description 주어진 분 단위 시간 차이를 '시간 분' 형식의 문자열로 변환합니다.
 *
 * @param {number} diffMinute — 시간 차이를 나타내는 분 단위 값입니다. 0 이상이어야 합니다.
 * @returns {string} — 변환된 '시간 분' 형식의 문자열을 반환합니다.
 *
 * @example
 * // 80분을 '1시간 20분' 형식으로 변환
 * formattingDateDiff(80); // "1시간 20 분"
 *
 * @example
 * // 45분은 시간 없이 분만 반환
 * formattingDateDiff(45); // "45 분"
 *
 * @example
 * // 0분은 항상 '0 분'을 반환
 * formattingDateDiff(0); // "0 분"
 *
 * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
 */
export const formattingDateDiff = (diffMinute: number): string => {
  if (diffMinute < 1) return '0 분';
  const hour = Math.floor(diffMinute / 60);
  const min = diffMinute % 60;
  let result = '';
  if (hour > 0) result += `${hour}시간 `;
  result += `${Math.round(min)} 분`;
  return result;
};
