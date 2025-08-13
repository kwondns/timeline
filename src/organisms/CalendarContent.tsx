'use client';

import { PastListType } from '@/types/past.type';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPastLink } from '@/lib/date';

type CalendarContentProps = {
  pasts: PastListType[];
};

export default function CalendarContent(props: CalendarContentProps) {
  const { pasts } = props;
  const route = useRouter();
  useEffect(() => {
    if (!pasts) return;
    pasts.forEach(({ date, titles }) => {
      const slot = document.getElementById(
        `calendar-content-${new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10)}`,
      );
      if (!slot) return;
      slot.innerHTML = '';
      titles.forEach((title, i) => {
        if (title) {
          const span = document.createElement('span');
          span.innerText = title;
          span.className = 'mb-1.5 block cursor-pointer';
          span.id = `${date}_${i}`;
          span.onclick = () => {
            route.push(createPastLink(date, String(i)));
          };
          slot.appendChild(span);
        }
      });
    });
  }, [pasts, route]);
  return null;
}
