import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { refresh } from '@/lib/auth/token';
import { refreshSession, verifySession } from '@/lib/auth/session';
import { withGlobalRefreshSingleFlight } from '@/lib/core/single';
import { setCookie } from '@/lib/auth/cookie';

const REFRESH_COOLDOWN_MS = 30_000; // 30초

export async function POST() {
  const cookieStore = await cookies();
  const lastRefreshed = cookieStore.get('last-refreshed')?.value;
  if (lastRefreshed) {
    const elapsed = Date.now() - parseInt(lastRefreshed, 10);
    if (elapsed < REFRESH_COOLDOWN_MS) {
      // 30초 이내 재호출 스킵
      const currentSession = await verifySession();
      if (currentSession) {
        return NextResponse.json(currentSession);
      }
      return NextResponse.json({ message: 'Too many requests' }, { status: 429 });
    }
  }
  const refreshToken = cookieStore.get('refresh-token')?.value;
  if (!refreshToken) {
    return NextResponse.json({}, { status: 401 });
  }
  const refreshed = await withGlobalRefreshSingleFlight(async () => {
    const r = await refresh(refreshToken);
    return r || null;
  });
  if (!refreshed) {
    await setCookie('session', '', 0);
    await setCookie('refresh-token', '', 0);
    await setCookie('auth-token', '', 0);
    return NextResponse.json({}, { status: 401 });
  }

  const session = await refreshSession(refreshed);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  cookieStore.set({
    name: 'last-refreshed',
    value: String(Date.now()),
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  return NextResponse.json(session);
}
