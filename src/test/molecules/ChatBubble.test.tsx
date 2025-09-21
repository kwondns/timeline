import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChatBubble from '@/molecules/ChatBubble';

describe('Molecule - ChatBubble 컴포넌트', () => {
  describe('UI - isBot에 따라 위치와 색상이 다르게 표기된다.', () => {
    it('isBot이 true일 경우 bg-secondary text-secondary-foreground self-start 속성을 갖는다', async () => {
      render(<ChatBubble isBot text="test" />);
      const markdownEditor = await screen.findByText('test');
      expect(markdownEditor).toBeInTheDocument();
      const Container = markdownEditor?.parentElement?.parentElement;
      expect(Container).toHaveClass('bg-secondary text-secondary-foreground self-start');
    });
    it('isBot이 false일 경우 self-end bg-primary text-primary-foreground의 속성을 갖는다', async () => {
      render(<ChatBubble isBot={false} text="test" />);
      const markdownEditor = await screen.findByText('test');
      expect(markdownEditor).toBeInTheDocument();
      const Container = markdownEditor?.parentElement?.parentElement;
      expect(Container).toHaveClass('self-end bg-primary text-primary-foreground');
    });
    it('isBot이 true이고 문구가 없을 때 로딩 인디케이터가 표시 된다.', async () => {
      render(<ChatBubble isBot text="" />);
      const dots = await screen.findAllByText('.');
      dots.forEach((dot, index) => {
        expect(dot).toBeInTheDocument();
        expect(dot).toHaveClass('animate-bounce');
        if (index !== 0) {
          expect(dot).toHaveClass(`[animation-delay:${100 * index}ms]`);
        }
      });
    });
  });
});
