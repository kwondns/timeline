import { formatDuration } from 'date-fns/formatDuration';
import { intervalToDuration } from 'date-fns/intervalToDuration';
import { ko, enUS } from 'date-fns/locale';
import { Locale } from '@/i18n/routing';

/**
 * @function formattingDateDiff
 * @description 시간차를 분 단위로 입력받아 지정된 로케일에 맞는 형식의 문자열로 변환합니다.
 *
 * @param {number} diffMinute — 시간차(분 단위)입니다. 0 이상의 정수여야 합니다. (필수)
 * @param {Locale} locale — 결과 문자열의 언어 및 형식을 지정할 로케일입니다.
 *                          'ko' 또는 'en' 값 중 하나를 사용합니다. (필수)
 * @returns {string} — 포맷된 시간차 문자열을 반환합니다. 예: "2시간 30분" (한국어 로케일 기준)
 * @throws {RangeError} — diffMinute가 0 미만이거나 유효한 정수가 아닐 경우 발생합니다.
 * @throws {Error} — locale 값이 'ko' 또는 'en' 외의 값인 경우 발생합니다.
 *
 * @example
 * // 한국어 로케일로 시간차 포맷
 * formattingDateDiff(150, 'ko'); // 결과: "2시간 30분"
 *
 * @example
 * // 영어 로케일로 시간차 포맷
 * formattingDateDiff(45, 'en'); // 결과: "45 minutes"
 *
 * @see https://date-fns.org/docs/intervalToDuration
 * @see https://date-fns.org/docs/formatDuration
 */
export const formattingDateDiff = (diffMinute: number, locale: Locale): string => {
  const duration = intervalToDuration({
    start: 0,
    end: diffMinute * 60 * 1000,
  });
  return formatDuration(
    { hours: duration.hours, minutes: duration.minutes },
    {
      locale: locale === 'ko' ? ko : enUS,
      format: ['hours', 'minutes'],
      zero: false, // 값이 0인 단위는 출력하지 않음
    },
  );
};
