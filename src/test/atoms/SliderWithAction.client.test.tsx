// oxlint-disable no-extend-native
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import SliderWithActionClient from '@/atoms/SliderWithAction.client';
import * as savePercentageModule from '@/actions/savePercentage.action';

// Mock dependencies
vi.mock('sonner', () => ({
  toast: {
    loading: vi.fn().mockReturnValue('loading-toast-id'),
    dismiss: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('@/actions/savePercentage.action', () => ({
  savePercentageAction: vi.fn(),
}));

vi.mock('@/hooks/useDebounce', () => ({
  default: (value: number, delay: number) => {
    // 테스트에서는 debounce를 즉시 반환하도록 설정
    return value;
  },
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

const mockSavePercentageAction = vi.mocked(savePercentageModule.savePercentageAction);
if (!HTMLElement.prototype.hasPointerCapture) {
  HTMLElement.prototype.hasPointerCapture = () => false;
}
if (!HTMLElement.prototype.releasePointerCapture) {
  HTMLElement.prototype.releasePointerCapture = () => {};
}
if (!HTMLElement.prototype.setPointerCapture) {
  HTMLElement.prototype.setPointerCapture = () => {};
}
describe('Atom -SliderWithActionClient 컴포넌트', () => {
  const defaultProps = {
    id: 'test-id',
    percentage: 50,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('초기 렌더링', () => {
    it('전달받은 percentage 값으로 슬라이더가 렌더링된다', () => {
      render(<SliderWithActionClient {...defaultProps} />);

      const slider = screen.getByRole('slider');
      expect(slider).toBeInTheDocument();
      expect(slider).toHaveAttribute('aria-valuenow', '50');
    });

    it('슬라이더의 min과 max 값이 올바르게 설정된다', () => {
      render(<SliderWithActionClient {...defaultProps} />);

      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuemin', '0');
      expect(slider).toHaveAttribute('aria-valuemax', '100');
    });
  });

  describe('슬라이더 값 변경', () => {
    it('키보드 오른쪽 화살표로 슬라이더 값을 증가시킬 수 있다', async () => {
      const user = userEvent.setup();
      render(<SliderWithActionClient {...defaultProps} />);

      const slider = screen.getByRole('slider');
      await user.click(slider); // 포커스를 위해 클릭

      const initialValue = parseInt(slider.getAttribute('aria-valuenow') || '50');

      // 오른쪽 화살표 키로 값 증가
      await user.keyboard('{ArrowRight}');

      await waitFor(() => {
        const newValue = parseInt(slider.getAttribute('aria-valuenow') || '50');
        expect(newValue).toBeGreaterThan(initialValue);
      });
    });

    it('키보드 왼쪽 화살표로 슬라이더 값을 감소시킬 수 있다', async () => {
      const user = userEvent.setup();
      render(<SliderWithActionClient {...defaultProps} />);

      const slider = screen.getByRole('slider');
      await user.click(slider); // 포커스를 위해 클릭

      const initialValue = parseInt(slider.getAttribute('aria-valuenow') || '50');

      // 왼쪽 화살표 키로 값 감소
      await user.keyboard('{ArrowLeft}');

      await waitFor(() => {
        const newValue = parseInt(slider.getAttribute('aria-valuenow') || '50');
        expect(newValue).toBeLessThan(initialValue);
      });
    });

    it('Home 키로 최소값(0)으로 설정할 수 있다', async () => {
      const user = userEvent.setup();
      render(<SliderWithActionClient {...defaultProps} />);

      const slider = screen.getByRole('slider');
      await user.click(slider);
      await user.keyboard('{Home}');

      await waitFor(() => {
        expect(slider).toHaveAttribute('aria-valuenow', '0');
      });
    });

    it('End 키로 최대값(100)으로 설정할 수 있다', async () => {
      const user = userEvent.setup();
      render(<SliderWithActionClient {...defaultProps} />);

      const slider = screen.getByRole('slider');
      await user.click(slider);
      await user.keyboard('{End}');

      await waitFor(() => {
        expect(slider).toHaveAttribute('aria-valuenow', '100');
      });
    });
  });

  describe('서버 액션 호출', () => {
    it('슬라이더 값 변경 시 savePercentageAction이 호출된다', async () => {
      mockSavePercentageAction.mockResolvedValueOnce(undefined);
      const user = userEvent.setup();

      render(<SliderWithActionClient {...defaultProps} />);

      const slider = screen.getByRole('slider');
      await user.click(slider);
      await user.keyboard('{ArrowRight}');

      await waitFor(() => {
        expect(mockSavePercentageAction).toHaveBeenCalled();
      });
    });

    it('올바른 id와 변경된 percentage로 액션이 호출된다', async () => {
      mockSavePercentageAction.mockResolvedValueOnce(undefined);
      const user = userEvent.setup();

      const customProps = {
        id: 'custom-id',
        percentage: 25,
      };

      render(<SliderWithActionClient {...customProps} />);

      const slider = screen.getByRole('slider');
      await user.click(slider);
      await user.keyboard('{End}'); // 100으로 설정

      await waitFor(() => {
        expect(mockSavePercentageAction).toHaveBeenCalledWith({
          id: 'custom-id',
          percentage: 100,
        });
      });
    });
  });

  describe('Toast 메시지', () => {
    it('액션 호출 시 로딩 토스트가 표시된다', async () => {
      mockSavePercentageAction.mockResolvedValueOnce(undefined);
      const user = userEvent.setup();

      render(<SliderWithActionClient {...defaultProps} />);

      const slider = screen.getByRole('slider');
      await user.click(slider);
      await user.keyboard('{ArrowRight}');

      await waitFor(() => {
        expect(toast.loading).toHaveBeenCalledWith('updateLoading');
      });
    });

    it('액션 성공 시 성공 토스트가 표시되고 로딩 토스트가 제거된다', async () => {
      mockSavePercentageAction.mockResolvedValueOnce(undefined);
      const user = userEvent.setup();

      render(<SliderWithActionClient {...defaultProps} />);

      const slider = screen.getByRole('slider');
      await user.click(slider);
      await user.keyboard('{ArrowRight}');

      await waitFor(() => {
        expect(toast.dismiss).toHaveBeenCalledWith('loading-toast-id');
        expect(toast.success).toHaveBeenCalledWith('updateSuccess');
      });
    });

    it('액션 실패 시 에러 토스트가 표시되고 로딩 토스트가 제거된다', async () => {
      mockSavePercentageAction.mockRejectedValueOnce(new Error('Server error'));
      const user = userEvent.setup();

      render(<SliderWithActionClient {...defaultProps} />);

      const slider = screen.getByRole('slider');
      await user.click(slider);
      await user.keyboard('{ArrowRight}');

      await waitFor(() => {
        expect(toast.dismiss).toHaveBeenCalledWith('loading-toast-id');
        expect(toast.error).toHaveBeenCalledWith('updateError');
      });
    });
  });

  describe('렌더링 상태 관리', () => {
    it('초기 렌더링 시에는 액션이 호출되지 않는다', async () => {
      mockSavePercentageAction.mockResolvedValueOnce(undefined);

      render(<SliderWithActionClient {...defaultProps} />);

      // 초기 렌더링 후 잠시 대기
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(mockSavePercentageAction).not.toHaveBeenCalled();
    });

    it('컴포넌트가 마운트된 후에만 액션이 호출된다', async () => {
      mockSavePercentageAction.mockResolvedValueOnce(undefined);
      const user = userEvent.setup();

      render(<SliderWithActionClient {...defaultProps} />);

      // 컴포넌트가 마운트된 후 슬라이더 조작
      const slider = screen.getByRole('slider');
      await user.click(slider);
      await user.keyboard('{ArrowRight}');

      await waitFor(() => {
        expect(mockSavePercentageAction).toHaveBeenCalled();
      });
    });
  });

  describe('경계값 테스트', () => {
    it('최소값(0)에서 더 감소시키려 해도 0을 유지한다', async () => {
      const user = userEvent.setup();
      render(<SliderWithActionClient id="test" percentage={0} />);

      const slider = screen.getByRole('slider');
      await user.click(slider);
      await user.keyboard('{ArrowLeft}');

      expect(slider).toHaveAttribute('aria-valuenow', '0');
    });

    it('최대값(100)에서 더 증가시키려 해도 100을 유지한다', async () => {
      const user = userEvent.setup();
      render(<SliderWithActionClient id="test" percentage={100} />);

      const slider = screen.getByRole('slider');
      await user.click(slider);
      await user.keyboard('{ArrowRight}');

      expect(slider).toHaveAttribute('aria-valuenow', '100');
    });
  });

  describe('다른 percentage 초기값 테스트', () => {
    it('0% 초기값으로 렌더링된다', () => {
      render(<SliderWithActionClient id="test" percentage={0} />);

      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuenow', '0');
    });

    it('100% 초기값으로 렌더링된다', () => {
      render(<SliderWithActionClient id="test" percentage={100} />);

      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuenow', '100');
    });

    it('중간값(75%) 초기값으로 렌더링된다', () => {
      render(<SliderWithActionClient id="test" percentage={75} />);

      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuenow', '75');
    });
  });
});
