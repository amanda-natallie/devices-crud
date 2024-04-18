import { Helpers, render, screen } from 'utils/test';

import { DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut } from './dropdown-menu';

describe('DropdownMenuLabel', () => {
  it('renders the label correctly', () => {
    render(<DropdownMenuLabel>Label</DropdownMenuLabel>);
    Helpers.expectText('Label');
  });
  it('renders the label with inset correctly', () => {
    render(<DropdownMenuLabel inset>Label</DropdownMenuLabel>);

    const label = screen.getByText('Label');
    expect(label).toHaveClass('pl-8');
  });
});

describe('DropdownMenuSeparator', () => {
  it('renders the separator correctly', () => {
    render(<DropdownMenuSeparator />);

    const separator = screen.getByRole('separator');
    expect(separator).toBeInTheDocument();
  });
});

describe('DropdownMenuShortcut', () => {
  it('renders the shortcut correctly', () => {
    render(<DropdownMenuShortcut>Shortcut</DropdownMenuShortcut>);
    Helpers.expectText('Shortcut');
  });
});
