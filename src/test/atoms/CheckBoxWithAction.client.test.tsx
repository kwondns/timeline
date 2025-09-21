import { describe, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CheckBoxWithActionClient from '@/atoms/CheckBoxWithAction.client';
import { toggleCheckBoxAction } from '@/actions/toggleCheckBox.action';
import { toast } from 'sonner';

vi.mock('@/actions/toggleCheckBox.action', () => ({
  toggleCheckBoxAction: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('Atom - CheckBoxWithActionClient 컴포넌트', () => {
  describe('initState에 따른 초기 상태', () => {
    it('초기 상태가 true일 때 Check', () => {
      render(<CheckBoxWithActionClient id="test" initState />);
      const Component = screen.getByRole('checkbox');
      expect(Component).toBeChecked();
    });
    it('초기 상태가 false일 때 UnCheck', () => {
      render(<CheckBoxWithActionClient id="test" initState={false} />);
      const Component = screen.getByRole('checkbox');
      expect(Component).not.toBeChecked();
    });
  });
  describe('Action에 따른 변화', () => {
    const mockToggleAction = vi.mocked(toggleCheckBoxAction);

    it('버튼 클릭 시 Check 상태 변경', async () => {
      mockToggleAction.mockResolvedValueOnce(undefined);

      // 기본 UnCheck
      render(<CheckBoxWithActionClient id="test" initState={false} />);
      const Component = screen.getByRole('checkbox');
      expect(Component).not.toBeChecked();

      // Check로 변경
      fireEvent.click(Component);
      expect(Component).toBeChecked();
      await waitFor(() => {
        expect(mockToggleAction).toHaveBeenCalledWith({
          id: 'test',
          checked: true,
          category: 'future',
        });
      });

      // 다시 UnCheck로 변경
      fireEvent.click(Component);
      expect(Component).not.toBeChecked();
      await waitFor(() => {
        expect(mockToggleAction).toHaveBeenCalledWith({
          id: 'test',
          checked: false,
          category: 'future',
        });
      });
    });
    it('버튼 클릭 시 오류 발생 후 토스트 생성과 롤백', async () => {
      mockToggleAction.mockRejectedValueOnce(new Error('test error'));
      render(<CheckBoxWithActionClient id="test" initState={false} />);
      const Component = screen.getByRole('checkbox');
      expect(Component).not.toBeChecked();

      fireEvent.click(Component);
      expect(Component).toBeChecked();
      await waitFor(() => {
        expect(mockToggleAction).toHaveBeenCalledWith({
          id: 'test',
          checked: true,
          category: 'future',
        });
      });
      await waitFor(() => {
        expect(Component).not.toBeChecked();
        expect(toast.error).toHaveBeenCalled();
      });
    });
    it('props의 category에 따른 서버액션이 호출된다.', () => {
      const mockToggleAction = vi.mocked(toggleCheckBoxAction);
      render(<CheckBoxWithActionClient id="test" initState={false} category="box" />);
      const Component = screen.getByRole('checkbox');

      fireEvent.click(Component);
      expect(mockToggleAction).toHaveBeenCalledWith({
        id: 'test',
        checked: true,
        category: 'box',
      });
    });
  });
});
