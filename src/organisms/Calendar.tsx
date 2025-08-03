import { calcPreviousMonth } from '@/lib/date';
import { cache } from 'react';
import CalendarContent from '@/molecules/CalendarContent';
import { PastType } from '@/types/past.type';

type CalendarProps = {
  current: Date;
  pasts: PastType[];
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

export default function Calendar(props: CalendarProps) {
  const { current, pasts } = props;
  const today = new Date();
  const firstDay = current.getDay();
  const prev = calcPreviousMonth(current, firstDay);

  const calendarArray = generateCalendar(prev);
  return (
    <table className="grid h-full max-h-full grid-rows-[auto_1fr]">
      <thead className="">
        <tr className="grid grid-cols-7 text-lg">
          <th>일</th>
          <th>월</th>
          <th>화</th>
          <th>수</th>
          <th>목</th>
          <th>금</th>
          <th>토</th>
        </tr>
      </thead>
      <tbody className="grid grid-rows-6">
        {calendarArray.map((week, weekIndex) => (
          <tr className="grid grid-cols-7" key={`${weekIndex} 주`}>
            {week.map((day, dayIndex) => {
              const titleIndex = weekIndex * 7 + dayIndex;
              return (
                <td className="align-text-top" key={day.getTime()}>
                  <span
                    className={`${day.getMonth() === current.getMonth() ? 'text-base' : 'text-green/60'} ${day.toDateString() === today.toDateString() && '!text-2xl text-sky-300'}`}
                  >
                    {day.getDate() === 1 ? `${day.getMonth() + 1}월 ${day.getDate()}일` : `${day.getDate()}일`}
                  </span>
                  <div className="overflow-auto">
                    {pasts[titleIndex] && <CalendarContent past={pasts[titleIndex]} />}
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
