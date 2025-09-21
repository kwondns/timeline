import { describe, vitest } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import InputOrDisplayClient, { InputOrDisplayProps } from '@/atoms/InputOrDisplay.client';
import { useState } from 'react';

function TestWrapper(props: Partial<InputOrDisplayProps>) {
  const { action = vitest.fn(), setValue, initValue = '' } = props;
  const [value, setValueInternal] = useState(initValue);
  const handleSetValue = setValue ?? setValueInternal;

  return (
    <InputOrDisplayClient
      data-testid="inputOrDisplayClient"
      typo="h1"
      initValue={initValue}
      value={value}
      setValue={handleSetValue}
      action={action}
      {...props}
    />
  );
}

function renderComponent(props: Partial<InputOrDisplayProps> = {}) {
  render(<TestWrapper {...props} />);
}

const getByTestId = () => screen.getByTestId('inputOrDisplayClient') as HTMLElement;
const getInput = () => screen.queryByRole('textbox') as HTMLInputElement;
const getDisplay = () => screen.queryByRole('heading', { level: 1 }) as HTMLElement;

describe('Atom - InputOrDisplayClient 컴포넌트', () => {
  describe('초기 렌더링', () => {
    it('기본 값이 전달될 경우 기본으로 Typography 형태', () => {
      const typography = 'h1';
      render(
        <InputOrDisplayClient
          data-testid={'inputOrDisplayClient'}
          typo={typography}
          initValue="test"
          action={vitest.fn()}
          setValue={vitest.fn()}
        />,
      );
      const Component = screen.getByTestId('inputOrDisplayClient');
      expect(Component.tagName.toLowerCase()).toBe(typography);
    });

    it('기본 값이 없을 경우 Input 형태', () => {
      render(
        <InputOrDisplayClient
          data-testid={'inputOrDisplayClient'}
          typo="h1"
          action={vitest.fn()}
          setValue={vitest.fn()}
        />,
      );
      const Component = screen.getByTestId('inputOrDisplayClient');
      expect(Component.tagName.toLowerCase()).toBe('input');
    });
  });
  describe('상태 전환', () => {
    it('더블 클릭 시 Input으로 전환', () => {
      renderComponent({ initValue: 'test' });

      const display = getDisplay();
      fireEvent.doubleClick(display);
      expect(getInput()).toBeInTheDocument();
    });

    it('Enter 입력 시 action 호출 및 Display로 전환', async () => {
      const action = vitest.fn();
      renderComponent({ action });

      const input = getInput();
      fireEvent.change(input, { target: { value: 'abc' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

      expect(action).toHaveBeenCalledTimes(1);

      const display = await screen.findByText('abc');
      expect(display.tagName.toLowerCase()).toBe('h1');
      expect(display).toHaveTextContent('abc');
    });

    it('Escape 입력 시 setValue(initValue) 호출 및 Display로 복귀', () => {
      const setValue = vitest.fn();
      renderComponent({ initValue: 'original', setValue });

      // Display → Input
      fireEvent.doubleClick(screen.getByText('original'));

      const input = getInput();
      fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });

      expect(setValue).toHaveBeenCalledWith('original');

      const display = getByTestId();

      expect(display.tagName.toLowerCase()).toBe('h1');
      expect(display).toHaveTextContent('original');
    });
  });
});
