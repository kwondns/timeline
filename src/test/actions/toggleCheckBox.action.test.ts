import { describe, vi } from 'vitest';
import { callFetchForAction } from '@/lib/dal/http';
import { revalidateTag } from 'next/cache';
import { toggleCheckBoxAction } from '@/actions/toggleCheckBox.action';

vi.mock('@/lib/dal/http', () => ({
  callFetchForAction: vi.fn(),
  withTokenValidation: vi.fn((fn) => fn),
}));

describe('Action - ToggleCheckBoxAction', () => {
  const mockCallFetch = vi.mocked(callFetchForAction);
  const mockRevalidateTag = vi.mocked(revalidateTag);

  it('future 카테고리로 체크박스 토글이 성공적으로 처리된다', async () => {
    mockCallFetch.mockResolvedValueOnce(undefined);
    const payload = {
      category: 'future' as const,
      checked: true,
      id: 'test-future-id',
    };
    await toggleCheckBoxAction(payload);
    expect(mockCallFetch).toHaveBeenCalledWith(
      '/future',
      { id: 'test-future-id', checked: true },
      { method: 'PATCH', expectNoContent: true, auth: true },
    );
    expect(mockRevalidateTag).toHaveBeenCalledWith('future-test-user-id');
    expect(mockRevalidateTag).toHaveBeenCalledWith('time-future-test-user-id');
  });

  it('futureBox 카테고리로 체크박스 토글이 성공적으로 처리된다', async () => {
    mockCallFetch.mockResolvedValueOnce(undefined);
    const payload = {
      category: 'box' as const,
      checked: true,
      id: 'test-box-id',
    };
    await toggleCheckBoxAction(payload);
    expect(mockCallFetch).toHaveBeenCalledWith(
      '/future/box',
      { id: 'test-box-id', checked: true },
      { method: 'PATCH', expectNoContent: true, auth: true },
    );
  });

  it('API 실패 시 에러가 전파된다.', async () => {
    const error = new Error('API Error');
    mockCallFetch.mockRejectedValueOnce(error);

    const payload = {
      category: 'future' as const,
      checked: true,
      id: 'test-id',
    };

    await expect(toggleCheckBoxAction(payload)).rejects.toThrow('API Error');
  });
});
