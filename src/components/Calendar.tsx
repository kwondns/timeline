import { MouseEvent, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { AccordionAtom, CalendarAtom, PastDateAtom, PastDateCountAtom } from '@/stores/Past.store';
import { makePreviousMonth } from '@/libs/date.lib';
import { usePastCalendar } from '@/hooks/usePast';

export default function Calendar() {
  const today = new Date();
  const current = useRecoilValue(CalendarAtom);
  const firstDay = current.getDay();
  const setActivityDate = useSetRecoilState(PastDateAtom);
  const setPastDateCount = useSetRecoilState(PastDateCountAtom);
  const setAccordion = useSetRecoilState(AccordionAtom);
  const navigate = useNavigate();

  const prev = makePreviousMonth(current, firstDay);

  const generateCalendar = (startDate: Date) => {
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
  };
  const { data } = useQuery({ ...usePastCalendar(prev) });
  const calendarArray = useMemo(() => generateCalendar(prev), [current]);

  const onClickTitle = (event: MouseEvent<HTMLSpanElement>) => {
    const { id } = event.currentTarget;
    const [week, day, index, count] = id.split('.');
    const target = calendarArray[Number(week)][Number(day)];
    setActivityDate(target.toLocaleDateString());
    setPastDateCount(Number(count));
    setAccordion(Number(index));
    navigate('/past');
  };

  return (
    <table className="table grid h-full max-h-full grid-rows-[auto_1fr]">
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
                    className={`${day.getMonth() === current.getMonth() ? 'text-lg' : 'text-accent'} ${day.toDateString() === today.toDateString() && '!text-2xl text-sky-300'}`}
                  >
                    {day.getDate() === 1 ? `${day.getMonth() + 1}월 ${day.getDate()}일` : `${day.getDate()}일`}
                  </span>
                  <div className="overflow-auto">
                    {data
                      ? data[titleIndex]?.titles?.map((title, insideIndex) => (
                          <span
                            key={`${data[titleIndex].date}_${data[titleIndex].id}_${title}`}
                            id={`${weekIndex}.${dayIndex}.${insideIndex}.${data[titleIndex].count}`}
                            onClick={onClickTitle}
                            className="mb-1.5 block cursor-pointer"
                          >
                            {title}
                          </span>
                        ))
                      : null}
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
