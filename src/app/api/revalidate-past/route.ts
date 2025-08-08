import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST() {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 15 * 60 * 60 * 1000);
  const yesterdayString = yesterday.toISOString().slice(0, 10);
  const twoDaysAgo = new Date(now.getTime() - 39 * 60 * 60 * 1000);
  const twoDaysAgoString = twoDaysAgo.toISOString().slice(0, 10);

  const pathsToRevalidate = [`/past/${yesterdayString}`, `/past/${twoDaysAgoString}`];
  pathsToRevalidate.forEach((path) => {
    revalidatePath(path);
    console.log(`Revalidated: ${path}`);
  });

  return NextResponse.json({
    success: true,
    revalidatedPaths: pathsToRevalidate,
    timeStamp: now.toISOString(),
  });
}
