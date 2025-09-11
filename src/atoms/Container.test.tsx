import Container from './Container';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Atom - Container 테스트', () => {
  it('기본적으로 flex row 컨테이너를 렌더링한다', () => {
    render(<Container data-testid="container">Unit Test </Container>);
    const container = screen.getByTestId('container');
    expect(container).toBeDefined();
    expect(container).toHaveClass('flex');
    expect(container).not.toHaveClass('flex-col');
  });

  it('direction column - flex-col 상태의 div를 렌더링', () => {
    render(
      <Container direction="column" data-testid="container">
        Unit Test
      </Container>,
    );
    const container = screen.getByTestId('container');
    expect(container).toHaveClass('flex-col');
  });
});
