import { sortSelectConfig } from 'config/sortSelectConfig';

import { act, renderHook } from 'utils/test';

import useSortSelect from './use-sort-select';

describe('useSortSelect', () => {
  it('should initialize with the first sort configuration', () => {
    const { result } = renderHook(() => useSortSelect());

    expect(result.current.value).toEqual(sortSelectConfig[0]);
  });

  it('should set the sort configuration based on the provided id', () => {
    const { result } = renderHook(() => useSortSelect());

    act(() => {
      result.current.setSort('hdd-desc');
    });

    expect(result.current.value).toEqual(sortSelectConfig[1]);
  });
});
