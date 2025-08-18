let globalRefreshPromise: Promise<any> | null = null;
let globalRefreshTimestamp = 0;

export async function withGlobalRefreshSingleFlight<T>(fn: () => Promise<T>): Promise<T> {
  const now = Date.now();

  // 이미 진행 중인 리프레시가 있으면 그 결과를 기다림
  if (globalRefreshPromise && now - globalRefreshTimestamp < 10000) {
    // 10초 내
    try {
      return await globalRefreshPromise;
    } catch (error) {
      // 실패한 경우에만 새로 시도
      globalRefreshPromise = null;
    }
  }

  // 새 리프레시 시작
  globalRefreshTimestamp = now;
  globalRefreshPromise = fn();

  try {
    return await globalRefreshPromise;
  } finally {
    // 완료 후 5초 뒤에 정리 (다른 요청들이 결과를 받을 시간 확보)
    setTimeout(() => {
      globalRefreshPromise = null;
    }, 5000);
  }
}
