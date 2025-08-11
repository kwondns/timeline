import { verifySession } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await verifySession();
  if (!session) return NextResponse.json({}, { status: 401 });
  return NextResponse.json(session);
}
