import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { vi } from 'vitest';

beforeEach(() => {
  cleanup();
});

vi.mock('next/headers', () => {
  return {
    headers: vi.fn(async () => {
      const map = new Map<string, string>();
      // 테스트별로 전역 변수로 덮어쓰기
      const uid = (globalThis as any).__TEST_USER_ID__ ?? 'test-user-id';
      map.set('x-user-id', uid);
      return {
        get: (k: string) => map.get(k) ?? null,
        // 필요 시 has, entries 등 추가
      };
    }),
    cookies: vi.fn(() => new Map()), // 사용 안 하면 생략 가능
  };
});

vi.mock('next/cache', () => {
  return {
    revalidateTag: vi.fn(), // spy 목적
    revalidatePath: vi.fn(),
  };
});

vi.mock('sonner', () => ({
  toast: {
    loading: vi.fn(() => 'loading-toast-id'),
    success: vi.fn(),
    error: vi.fn(),
    dismiss: vi.fn(),
  },
}));

// shadcn/ui 내부 로직 모킹
vi.stubGlobal(
  'ResizeObserver',
  class {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  },
);
