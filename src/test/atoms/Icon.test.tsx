import { Icon, IconType } from '@/atoms/Icon';
import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Atom - Icon 테스트', () => {
  it('아이콘 타입과 아이콘 키가 일치 ', () => {
    const iconTypeKeys = Object.keys(Icon) as IconType[];
    expect(iconTypeKeys).toEqual(expect.arrayContaining(iconTypeKeys));
  });
  Object.entries(Icon).forEach(([key, element]) => {
    it(`${key} 키가 유효한 아이콘 컴포넌트를 렌더링해야 한다`, () => {
      render(<div data-testid={key}>{element}</div>);
      const container = screen.getByTestId(key);

      // 내부에 svg가 있으면 통과
      expect(container.querySelector('svg')).not.toBeNull();
    });
  });
});
