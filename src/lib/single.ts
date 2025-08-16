let inflight: Promise<any> | null = null;

export async function withRefreshSingleFlight<T>(fn: () => Promise<T>): Promise<T> {
  inflight ??= (async () => {
    try {
      return await fn();
    } finally {
      // 완료 시 inflight 초기화
      inflight = null;
    }
  })();
  // 이미 진행중이면 동일 Promise 공유(동시 호출자 대기)
  return inflight as Promise<T>;
}
