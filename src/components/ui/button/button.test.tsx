import { Helpers, render, screen } from 'utils/test';

import { Button } from './button';

describe('Button', () => {
  it('renders the button with default variant and size', () => {
    render(<Button />);
    Helpers.expectRoleToHaveClasses('button', [
      'bg-primary',
      'text-primary-foreground',
      'h-10',
      'px-4',
      'py-2',
    ]);
  });

  it('renders the button with destructive variant', () => {
    render(<Button variant="destructive" />);
    Helpers.expectRoleToHaveClasses('button', ['bg-destructive', 'text-destructive-foreground']);
  });

  it('renders the button with outline variant', () => {
    render(<Button variant="outline" />);
    Helpers.expectRoleToHaveClasses('button', ['bg-background', 'border', 'border-input']);
  });

  it('renders the button with disabled state', () => {
    render(<Button disabled />);

    Helpers.expectRoleToHaveClasses('button', [
      'disabled:pointer-events-none',
      'disabled:opacity-50',
    ]);
    Helpers.expectRoleToHaveAttrs('button', ['disabled']);
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
