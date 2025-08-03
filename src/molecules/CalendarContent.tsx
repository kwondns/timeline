'use client';

import Typography from '@/atoms/Typography';
import { redirect } from 'next/navigation';
import { MouseEvent } from 'react';
import { PastType } from '@/types/past.type';

type CalendarContentProps = {
  past: PastType;
};

export default function CalendarContent(props: CalendarContentProps) {
  const { past } = props;
  const onClickTitle = (event: MouseEvent<HTMLSpanElement>) => {
    const { id } = event.currentTarget;
    const [date, index] = id.split('_');
    const count = index === '0' ? '' : `?index=${index}`;
    redirect(`/past/${new Date(date).toISOString().slice(0, 10)}${count}`);
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
