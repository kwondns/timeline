import { describe } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ActivityCalendarItemClient from '@/molecules/ActivityCalendarItem.client';
import userEvent from '@testing-library/user-event';
import { formattingDateDiff } from '@/lib/utils/date';
import { useRouter } from '@/i18n/navigation';

const getButton = () => screen.getByRole('button');

function renderComponent(count: number) {
  render(<ActivityCalendarItemClient date="2025-08-30" count={count} />);
}

describe('Molecule - ActivityCalendarItemClient 컴포넌트', () => {
  describe('UI - Count 수치에 따른 색상이 다르게 표시된다.', () => {
    it('Count의 수치가 0 일 경우 bg-gray-400 색상으로 표시된다.', () => {
      renderComponent(0);
      const item = getButton();
      expect(item).toHaveClass('bg-gray-400');
    });
    it('Count의 수치가 120 미만 일 경우 bg-green-300 색상으로 표시된다.', () => {
      renderComponent(110);
      const item = getButton();
      expect(item).toHaveClass('bg-green-300');
    });
    it('Count의 수치가 180 미만 일 경우 bg-green-500 색상으로 표시된다.', () => {
      renderComponent(160);
      const item = getButton();
      expect(item).toHaveClass('bg-green-500');
    });
    it('Count의 수치가 180 이상 일 경우 bg-green-700 색상으로 표시된다.', () => {
      renderComponent(300);
      const item = getButton();
      expect(item).toHaveClass('bg-green-700');
    });
    it('Hover를 했을 경우 날짜 - 시간을 표기한다.', async () => {
      renderComponent(300);
      const item = getButton();
      await userEvent.hover(item);
      const tooltipComponent = screen.getByRole('tooltip');
      expect(tooltipComponent).toBeInTheDocument();
      expect(tooltipComponent).toHaveTextContent(
        `${new Date('2025-08-30').toLocaleDateString()} - ${formattingDateDiff(300, 'ko')}`,
      );
    });
  });
  it('클릭 시 해당 date 값에 따른 과거 링크가 생성되며 이동된다.', () => {
    const { push } = useRouter();
    renderComponent(300);
    const item = getButton();
    fireEvent.click(item);
    expect(push).toHaveBeenCalledWith('/past/2025-08-30');
  });
});
