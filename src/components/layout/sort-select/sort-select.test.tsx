import { vi } from 'vitest';

import { act, render, waitFor } from 'utils/test';

import { SortSelect } from './sort-select';

describe('SortSelect', () => {
  it('renders correctly', () => {
    const { getByText } = render(<SortSelect />);
    expect(getByText('Sort By: HDD Capacity (Ascending)')).toBeInTheDocument();
  });

  it('should call setValue with the correct argument when setSort is called', async () => {
    render(<SortSelect />);
    const setSort = vi.fn();
    const setValue = vi.fn();

    act(() => {
      setSort('hdd-desc', 'HDD Capacity (Descending)', 'DESC');
    });

    waitFor(() => {
      expect(setValue).toHaveBeenCalledWith({
        id: 'hdd-desc',
        label: 'HDD Capacity (Descending)',
        sortBy: 'DESC',
      });
    });
  });
});
