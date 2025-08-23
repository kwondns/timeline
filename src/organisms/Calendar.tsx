import { calcPreviousMonth } from '@/lib/utils/date';
import { cache } from 'react';
import { getTranslations } from 'next-intl/server';
import { Locale } from '@/i18n/routing';

type CalendarProps = {
  locale: Locale;
  current: Date;
};
const generateCalendar = cache((startDate: Date) => {
  const calArr = [];
  for (let week = 0; week < 6; week++) {
    const weekArr = [];
    for (let day = 0; day < 7; day++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + week * 7 + day);
      weekArr.push(date);
    }
    calArr.push(weekArr);
  }
  return calArr;
});

export default async function Calendar(props: Readonly<CalendarProps>) {
  const { locale, current } = props;
  const today = new Date();
  const firstDay = current.getDay();
  const prev = calcPreviousMonth(current, firstDay);
  const t = await getTranslations({ locale, namespace: 'Calendar' });
  const monthDayFormatter = new Intl.DateTimeFormat(locale, {
    month: 'numeric',
    day: 'numeric',
  });
  const dayOnlyFormatter = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
  });
  const calendarArray = generateCalendar(prev);
  return (
    <table className="grid h-full max-h-full grid-rows-[auto_1fr]">
      <thead className="">
        <tr className="grid grid-cols-7 text-lg">
          {[t('sun'), t('mon'), t('tue'), t('wed'), t('thu'), t('fri'), t('sat')].map((d) => (
            <th key={d}>{d}</th>
          ))}
        </tr>
      </thead>
      <tbody className="grid grid-rows-6">
        {calendarArray.map((week, weekIndex) => (
          <tr className="grid grid-cols-7" key={`${weekIndex} 주`}>
            {week.map((day) => {
              let label: string;
              if (day.getDate() === 1) {
                if (locale === 'ko') {
                  // 한국어일 때만 "8월 1일"
                  label = `${day.getMonth() + 1}월 ${day.getDate()}일`;
                } else {
                  // 그 외 로케일 기본 "8/1" 등
                  label = monthDayFormatter.format(day);
                }
              } else {
                // 1일이 아닌 경우, 숫자만
                label = dayOnlyFormatter.format(day);
              }
              return (
                <td className="align-text-top" key={day.getTime()}>
                  <span
                    className={`${day.getMonth() === current.getMonth() ? 'text-base' : 'text-green/60'} ${day.toDateString() === today.toDateString() && '!text-2xl text-sky-300'}`}
                  >
                    {label}
                  </span>
                  <div className="overflow-visible ">
                    <div
                      id={`calendar-content-${new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
                        .toISOString()
                        .slice(0, 10)}`}
                    />
                  </div>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
