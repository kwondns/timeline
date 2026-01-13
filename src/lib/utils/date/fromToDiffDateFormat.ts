import { Locale } from '@/i18n/routing';
import { ensureDate } from '@/lib/utils/date/ensureDate';
import { flow, pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import { calculateDifferenceInMinutes } from '@/lib/utils/date/calculateDifferenceInMinutes';

const generateStartTimeToString = (start: Date | string, locale: Locale) =>
  pipe(
    start,
    ensureDate,
    O.map((date) => date.toLocaleTimeString(locale, { timeStyle: 'short', hour12: false, timeZone: 'Asia/Seoul' })),
  );

const getHoursAndMinutesFromMinutes = (min: number) => ({ hours: Math.floor(min / 60), minutes: min % 60 });

const matchTimeDuration = (hours: number, minutes: number) => ({
  hasHours: hours > 0,
  hasMinutes: minutes > 0,
  hours,
  minutes,
});

const formatTimeDuration = flow(
  matchTimeDuration,
  ({ hasHours, hasMinutes, hours, minutes }) =>
    (t: (key: string, values?: Record<string, any>) => string): string => {
      if (hasHours && hasMinutes) return t('hoursMinutes', { hours, minutes });
      if (hasHours) return t('hours', { hours });
      return t('minutes', { minutes });
    },
);

export const fromToDiffDateFormat = (
  startDate: string | Date,
  endDate: string | Date,
  t: (key: string, values?: Record<string, any>) => string, // next-intl translate callback
  locale: Locale,
): string =>
  pipe(
    O.Do,
    O.bind('start', () => generateStartTimeToString(startDate, locale)),
    O.bind('diff', () => calculateDifferenceInMinutes(startDate, endDate)),
    O.map(({ start, diff }) => {
      const { hours, minutes } = getHoursAndMinutesFromMinutes(diff);
      return t('diff', {
        start: start,
        diff: formatTimeDuration(hours, minutes)(t),
      });
    }),
    O.getOrElse(() => '-'),
  );
