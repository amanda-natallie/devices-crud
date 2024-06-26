import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { sortSelectConfig } from 'config/sortSelectConfig';
import { store } from 'store';
import { vi } from 'vitest';

import { act, renderHook } from 'utils/test';

import useSortSelect from './use-sort-select';

const wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe('useSortSelect', () => {
  it('should initialize with the first sort configuration', () => {
    const { result } = renderHook(() => useSortSelect(), { wrapper });

    expect(result.current.value).toEqual(sortSelectConfig[0]);
  });

  it('should set the sort configuration based on the provided id', () => {
    const { result } = renderHook(() => useSortSelect(), { wrapper });

    act(() => {
      result.current.setSort('hdd-desc');
    });

    expect(result.current.value).toEqual(sortSelectConfig[1]);
  });
  it('should reset the sort configuration to the default value after resetting filters', () => {
    const useAppSelector = vi.fn();
    useAppSelector.mockReturnValue({
      devicesState: {
        sortBy: 'ASC',
        orderResultBy: 'hdd_capacity',
      },
    });
    const { result } = renderHook(() => useSortSelect(), { wrapper });

    act(() => {
      result.current.setSort('hdd-asc');
    });

    expect(result.current.value).toEqual(sortSelectConfig[0]);
  });
});
