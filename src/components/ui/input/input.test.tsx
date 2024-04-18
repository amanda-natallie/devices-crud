import { Helpers, render, screen } from 'utils/test';

import { Input } from './input';

describe('SortSelect', () => {
  it('renders correctly', () => {
    render(<Input />);
    Helpers.expectTestIdToBeInDocument('input-wrapper');
    Helpers.expectTestIdToBeInDocument('input-element');
  });
  it('renders the icon correctly', () => {
    render(<Input icon="search" />);
    Helpers.expectTestIdToBeInDocument('input-icon-wrapper');
    Helpers.expectTestIdToBeInDocument('icon-svg-search');
  });
  it('shows the correct placeholder', () => {
    render(<Input placeholder="Search" />);
    const input = screen.getByTestId('input-element');
    expect(input).toHaveAttribute('placeholder', 'Search');
  });
});
