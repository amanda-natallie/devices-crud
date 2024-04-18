import { vi } from 'vitest';

import { Helpers, act, render, waitFor } from 'utils/test';

import { SortSelect } from './sort-select';

describe('SortSelect', () => {
  beforeEach(() => {
    render(<SortSelect />);
  });
  it('renders correctly', () => {
    Helpers.expectText('Sort By: HDD Capacity (Ascending)');
  });

  it('should call setValue with the correct argument when setSort is called', async () => {
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
