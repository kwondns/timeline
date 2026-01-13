import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';

type Priority = 1 | 2 | 3;
type BadgeInfo = { badgeContentKey: string; badgeColor: 'rose' | 'info' | 'green' };

const badgeMap: Record<Priority, BadgeInfo> = {
  1: { badgeContentKey: 'priorityHigh', badgeColor: 'rose' },
  2: { badgeContentKey: 'priorityMedium', badgeColor: 'info' },
  3: { badgeContentKey: 'priorityLow', badgeColor: 'green' },
};

/**
 * @function generatePriorityBadgeContent
 * @description 우선순위에 따라 배지 콘텐츠와 색상을 생성합니다.
 *
 * @param {(key: string) => string} t — 다국어 번역을 위한 함수입니다. next-intl의 객체 (필수)
 * @param {1 | 2 | 3} priority — 우선순위 값입니다. 1은 높은 우선순위, 2는 중간 우선순위, 3은 낮은 우선순위를 나타냅니다. (필수)
 *
 * @returns {{ badgeContent: string, badgeColor: 'rose' | 'info' | 'green' }}
 * — badgeContent는 우선순위에 따른 번역된 문자열이며, badgeColor는 이에 대응하는 색상 값입니다.
 *
 * @example
 * // 높은 우선순위의 배지 생성
 * generatePriorityBadgeContent(t, 1);
 * // { badgeContent: '높음', badgeColor: 'rose' }
 *
 * @example
 * // 낮은 우선순위의 배지 생성
 * generatePriorityBadgeContent(t, 3);
 * // { badgeContent: '낮음', badgeColor: 'green' }
 *
 * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/switch
 */

export default function generatePriorityBadgeContent(
  t: (key: string) => string,
  priority: 1 | 2 | 3,
): { badgeContent: string; badgeColor: 'rose' | 'info' | 'green' } {
  return pipe(
    O.fromNullable(badgeMap[priority]),
    O.getOrElse(() => badgeMap[3]),
    ({ badgeContentKey, badgeColor }) => ({
      badgeContent: t(badgeContentKey),
      badgeColor,
    }),
  );
}
