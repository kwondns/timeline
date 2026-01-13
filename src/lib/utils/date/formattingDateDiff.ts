import { Locale } from '@/i18n/routing';
import { formatDuration } from 'date-fns/formatDuration';
import { intervalToDuration } from 'date-fns/intervalToDuration';
import { enUS, ko } from 'date-fns/locale';
import { pipe } from 'fp-ts/function';
import { Duration } from 'date-fns';

const calculateDuration = (diffMinute: number) => {
  return intervalToDuration({
    start: 0,
    end: diffMinute * 60 * 1000,
  });
};

const formattingDuration = (duration: Duration, locale: Locale) => {
  return formatDuration(
    { hours: duration.hours, minutes: duration.minutes },
    {
      locale: locale === 'ko' ? ko : enUS,
      format: ['hours', 'minutes'],
      zero: false, // 값이 0인 단위는 출력하지 않음
    },
  );
};
export const formattingDateDiff = (diffMinute: number, locale: Locale): string =>
  pipe(diffMinute, calculateDuration, (duration) => formattingDuration(duration, locale));
