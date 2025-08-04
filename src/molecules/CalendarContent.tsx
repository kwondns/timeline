'use client';

import Typography from '@/atoms/Typography';
import { redirect } from 'next/navigation';
import { MouseEvent } from 'react';
import { PastListType } from '@/types/past.type';
import { createPastLink } from '@/lib/date';

type CalendarContentProps = {
  past: PastListType;
};

export default function CalendarContent(props: CalendarContentProps) {
  const { past } = props;
  const onClickTitle = (event: MouseEvent<HTMLSpanElement>) => {
    const { id } = event.currentTarget;
    const [date, index] = id.split('_');
    redirect(createPastLink(date, index));
  };

  return past.titles.map((title, index) => (
    <Typography.span
      key={`${past.id}_${title}`}
      id={`${past.date}_${index}`}
      className="mb-1.5 block cursor-pointer"
      onClick={onClickTitle}
    >
      {title}
    </Typography.span>
  ));
}
