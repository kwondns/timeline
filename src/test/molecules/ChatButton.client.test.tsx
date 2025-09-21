import { describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ChatButtonClient from '@/molecules/ChatButton.client';
import { useState } from 'react';

function renderComponent(isOpen = false, setIsOpenAction = vi.fn()) {
  return render(<ChatButtonClient isOpen={isOpen} setIsOpenAction={setIsOpenAction} />);
}

function renderWithState() {
  function Wrapper() {
    const [open, setOpen] = useState(false);
    return <ChatButtonClient isOpen={open} setIsOpenAction={setOpen} />;
  }
  return render(<Wrapper />);
}

describe('Molecule - ChatButtonClient 컴포넌트', () => {
  describe('UI', () => {
    it('isOpen이 false 일 때 TbMessage 아이콘, 문구 표시', () => {
      renderComponent(false);

      const Button = screen.getByRole('button');

      const FirstContainer = Button.firstChild;
      expect(FirstContainer).toHaveClass('opacity-0 scale-75');

      // 채팅창이 닫혀있을 때의 컨테이너
      const SecondContainer = Button.children[1];
      expect(SecondContainer).toHaveClass('opacity-100 scale-100');

      const TextComponent = screen.getByText('챗봇');
      expect(TextComponent).toBeInTheDocument();

      const IconComponent = SecondContainer.querySelector('svg');
      expect(IconComponent).toBeInTheDocument();
      const path = IconComponent?.querySelector('path');
      // TbMessage의 첫 path
      expect(path?.getAttribute('d')).toMatch(/M8 9h8/);
    });
    it('isOpen이 true 일 때 IoIosClose 아이콘만 표시', () => {
      renderComponent();
      const Button = screen.getByRole('button');
      const Icon = Button.querySelector('svg');
      expect(Icon).toBeInTheDocument();
      const path = Icon?.querySelector('path');
      // IoIosClose의 첫 path
      expect(path?.getAttribute('d')).toMatch(/278\.6 256/);

      // 채팅창이 열려있을 때의 보여지는 컨테이너
      const FirstContainer = Button.firstChild;
      // 채팅창이 닫혀있을 때 보여지는 컨테이너
      const SecondContainer = Button.children[1];
      expect(FirstContainer).toHaveClass('opacity-0 scale-75');
      expect(SecondContainer).toHaveClass('opacity-100 scale-100');
    });
  });
  describe('Action', () => {
    it('isOpen이 false일 때 클릭시 true로 변경 및 보여지는 컨테이너 변경', () => {
      renderWithState();
      const Button = screen.getByRole('button');

      const FirstContainer = Button.firstChild;
      const SecondContainer = Button.children[1];
      expect(FirstContainer).toHaveClass('opacity-0 scale-75');
      expect(SecondContainer).toHaveClass('opacity-100 scale-100');

      fireEvent.click(Button);

      const AfterClickButton = screen.getByRole('button');

      const AfterFirstContainer = AfterClickButton.firstChild;
      const AfterSecondContainer = AfterClickButton.children[1];

      expect(AfterFirstContainer).toHaveClass('opacity-100 scale-100');
      expect(AfterSecondContainer).toHaveClass('opacity-0 scale-75');
    });
  });
});
