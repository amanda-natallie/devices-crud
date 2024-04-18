import { render, screen } from 'utils/test';

import { Button } from './button';

describe('Button', () => {
  it('renders the button with default variant and size', () => {
    render(<Button />);
    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toHaveClass('bg-primary');
    expect(buttonElement).toHaveClass('text-primary-foreground');
    expect(buttonElement).toHaveClass('h-10');
    expect(buttonElement).toHaveClass('px-4');
    expect(buttonElement).toHaveClass('py-2');
  });

  it('renders the button with destructive variant', () => {
    render(<Button variant="destructive" />);
    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toHaveClass('bg-destructive');
    expect(buttonElement).toHaveClass('text-destructive-foreground');
  });

  it('renders the button with outline variant', () => {
    render(<Button variant="outline" />);
    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toHaveClass('border');
    expect(buttonElement).toHaveClass('border-input');
    expect(buttonElement).toHaveClass('bg-background');
  });

  it('renders the button with disabled state', () => {
    render(<Button disabled />);
    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toHaveClass('disabled:pointer-events-none');
    expect(buttonElement).toHaveClass('disabled:opacity-50');
    expect(buttonElement).toHaveAttribute('disabled');
  });

  it('merge its props onto its immediate child if asChild is true', () => {
    render(
      <Button asChild>
        <span data-testid="child" />
      </Button>,
    );
    const childElement = screen.getByTestId('child');

    expect(childElement).toHaveClass('bg-primary text-primary-foreground');
    expect(childElement).toHaveClass('h-10');
    expect(childElement).toHaveClass('px-4');
    expect(childElement).toHaveClass('py-2');
  });
});
