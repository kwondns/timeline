import FutureTemplate from '@/templates/Future.template';
import { FutureBoxCardProps } from '@/organisms/FutureBoxCard';
import { callGetWithAuth } from '@/lib/fetch';
import { NextResponse } from 'next/server';

export default async function Page() {
  const futureBoxes = await callGetWithAuth<FutureBoxCardProps[]>('/future');
  NextResponse.next({
    headers: {
      'Cache-Control': 'private, max-age=60',
    },
  });
  return <FutureTemplate futureBoxes={futureBoxes} />;
}
