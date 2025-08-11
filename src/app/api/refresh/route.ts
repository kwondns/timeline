import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { refresh } from '@/lib/dal/auth';
import { refreshSession } from '@/lib/session';

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh-token')?.value;
  if (!refreshToken) {
    return NextResponse.json({}, { status: 401 });
  }

  const refreshed = await refresh(refreshToken);
  if (!refreshed) {
    return NextResponse.json({}, { status: 401 });
  }

  const session = await refreshSession(refreshed);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  return NextResponse.json(session);
}
