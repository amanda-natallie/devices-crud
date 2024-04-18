import { render, screen } from 'utils/test';

import { DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut } from './dropdown-menu';

describe('DropdownMenuLabel', () => {
  it('renders the label correctly', () => {
    render(<DropdownMenuLabel>Label</DropdownMenuLabel>);

    const label = screen.getByText('Label');
    expect(label).toBeInTheDocument();
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

    const shortcut = screen.getByText('Shortcut');
    expect(shortcut).toBeInTheDocument();
  });
});
