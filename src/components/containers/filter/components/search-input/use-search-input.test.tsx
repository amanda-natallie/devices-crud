import { ChangeEvent } from 'react';

import { act, render, renderHook, screen, userEvent, waitFor } from 'utils/test';

import { SearchInput } from './search-input';
import useSearchInput from './use-search-input';

describe('useSearchInput', () => {
  it('should initialize with the first sort configuration', () => {
    const { result } = renderHook(() => useSearchInput());

    expect(result.current.search).toEqual('');
  });

  it('should set the input value when typing', async () => {
    renderHook(() => useSearchInput());
    render(<SearchInput />);
    const input = screen.getByTestId('input-element');
    act(() => {
      userEvent.type(input, 'hdd');
    });

    await waitFor(() => {
      expect(input).toHaveValue('hdd');
    });
  });
  it('should call setSearch with the correct argument when handleSearch is called', async () => {
    const { result } = renderHook(() => useSearchInput());
    act(() =>
      result.current.handleSearch({ target: { value: 'hdd' } } as ChangeEvent<HTMLInputElement>),
    );

    await waitFor(() => {
      expect(result.current.handleSearch).toBeDefined();
      expect(result.current.search).toEqual('hdd');
    });
  });
});
