import { describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ActionButtonGroupClient from '@/molecules/ActionButtonGroup.client';
import { usePresentActions } from '@/templates/Present.template.client';

vi.mock('@/templates/Present.template.client', () => ({
  usePresentActions: vi.fn(),
}));

function renderComponent(start = false) {
  render(<ActionButtonGroupClient isStarted={start} />);
}

describe('Molecule - ActionButtonGroupClient 컴포넌트', () => {
  beforeEach(() => {
    vi.mocked(usePresentActions).mockReturnValue({
      title: 'Title',
      startTime: '2025-09-20T00:00:00.000Z',
      initialContent: 'initial',
      currentContent: 'current',
      setCurrentContent: vi.fn(),
      onTempSave: vi.fn(),
      onSave: vi.fn(),
      onStart: vi.fn(),
    });
  });
  describe('기본 렌더링', () => {
    it('시작일 때 임시저장, 저장 버튼이 존재', () => {
      renderComponent(true);
      const TempSaveButton = screen.getByText('임시 저장');
      expect(TempSaveButton).toBeInTheDocument();
      const SaveButton = screen.getByText('종료');
      expect(SaveButton).toBeInTheDocument();
    });
    it('시작 전 시작 버튼이 존재', () => {
      renderComponent();
      const StartButton = screen.getByText('시작하기');
      expect(StartButton).toBeInTheDocument();
    });
  });
  describe('버튼 클릭 시 액션', () => {
    it('시작 버튼을 클릭 시 onStart 실행', () => {
      renderComponent();
      const StartButton = screen.getByText('시작하기');
      fireEvent.click(StartButton);
      expect(usePresentActions().onStart).toHaveBeenCalledTimes(1);
    });
    it('임시 저장 버튼을 클릭 시 onTempSave 호출', () => {
      renderComponent(true);
      const tempSaveButton = screen.getByText('임시 저장');
      fireEvent.click(tempSaveButton);
      expect(usePresentActions().onTempSave).toHaveBeenCalledTimes(1);
    });
    it('종료 버튼을 클릭 시 onSave 호출', () => {
      renderComponent(true);
      const saveButton = screen.getByText('종료');
      fireEvent.click(saveButton);
      expect(usePresentActions().onSave).toHaveBeenCalledTimes(1);
    });
  });
});
