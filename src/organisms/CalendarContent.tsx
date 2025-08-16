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
          const wrapper = document.createElement('div');
          const span = document.createElement('span');

          span.innerText = title;
          span.className = `
             block cursor-pointer bg-ring/30 
            rounded-full p-2 text-sm max-w-full whitespace-nowrap text-ellipsis overflow-hidden
          `;

          wrapper.dataset.title = title;
          wrapper.className = `
            mb-1.5 px-0.5 relative inline-block w-full group overflow-visible 
            before:content-[attr(data-title)] before:absolute before:bottom-full before:left-0
            before:mb-1 before:px-2 before:py-1 before:rounded before:bg-red-400 before:text-white
            before:text-xs before:whitespace-nowrap
            before:opacity-0 hover:before:opacity-100 before:transition before:pointer-events-none 
          `;

          wrapper.id = `${date}_${i}`;
          wrapper.onclick = () => {
            route.push(createPastLink(date, String(i)));
          };

          wrapper.appendChild(span);
          slot.appendChild(wrapper);
        }
      });
    });
  }, [pasts, route]);

  return null;
}
