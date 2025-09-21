import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Typography, { typoType } from '@/atoms/Typography';

describe('Atom - Typography 컴포넌트', () => {
  Object.entries(Typography).forEach(([key, _element]) => {
    it(`Typography.${key} 컴포넌트의 기본 스타일`, () => {
      const defaultStyle = typoType.find(({ component }) => component === key)?.defaultClassName ?? '';
      // @ts-ignore
      render(<>{Typography[key]({ 'data-testid': key, children: 'test' })}</>);
      const target = screen.getByTestId(key);
      expect(target).toBeInTheDocument();
      if (key !== 'p') expect(target).toHaveClass(defaultStyle);
    });
  });
});
