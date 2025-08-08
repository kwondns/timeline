import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST() {
  const now = new Date();

  now.setMonth(now.getUTCMonth() - 1);
  const pathToRevalidate = `/calendar/${now.toISOString().slice(0, 7)}`;

  revalidatePath(pathToRevalidate);
  console.log(`Revalidated: ${pathToRevalidate}`);

  return NextResponse.json({
    success: true,
    revalidatedPath: pathToRevalidate,
    timeStamp: now.toISOString(),
  });
}
