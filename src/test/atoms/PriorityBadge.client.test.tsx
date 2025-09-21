import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import PriorityBadgeClient from '@/atoms/PriorityBadge.client';
import { LOCALE } from '@/i18n/routing';

const testRegex = {
  ko: /높음/,
  en: /High/,
  ja: /高/,
  es: /Alta/,
  fr: /Haute/,
  'zh-cn': /高/,
};

describe('Atom - PriorityBadgeClient 컴포넌트(RCC)', () => {
  describe('각 언어에 맞는 문구가 표기됩니다.', () => {
    it.each(LOCALE)(`%s 언어의 문구가 표기됩니다.`, (locale) => {
      (global as any).__TEST_LOCALE__ = locale;
      render(<PriorityBadgeClient priority={1} />);
      const Component = screen.getByText(testRegex[locale]);
      expect(Component).toBeInTheDocument();
    });
  });
  describe('각 우선순위에 맞는 문구가 표기됩니다.(ko)', () => {
    beforeAll(() => ((global as any).__TEST_LOCALE__ = 'ko'));
    it('높음 우선순위', async () => {
      render(<PriorityBadgeClient priority={1} />);
      const Component = screen.getByText(/높음/);
      expect(Component).toBeInTheDocument();
    });
    it('중간 우선순위', async () => {
      render(<PriorityBadgeClient priority={2} />);
      const Component = screen.getByText(/중간/);
      expect(Component).toBeInTheDocument();
    });
    it('낮음 우선순위', async () => {
      render(<PriorityBadgeClient priority={3} />);
      const Component = screen.getByText(/낮음/);
      expect(Component).toBeInTheDocument();
    });
  });
});
