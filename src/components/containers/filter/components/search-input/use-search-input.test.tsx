import { ChangeEvent, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from 'store';
import { vi } from 'vitest';

import { act, renderHook, waitFor } from 'utils/test';

import useSearchInput from './use-search-input';

const wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe('useSearchInput', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  it('should debounce the setSearchValue calls', async () => {
    const setSearchValueMock = vi.fn();
    vi.mock('hooks/useDevicesActions', () => ({
      useDevicesActions: () => ({
        setSearchValue: setSearchValueMock,
      }),
    }));

    const { result } = renderHook(() => useSearchInput(), { wrapper });
    act(() => {
      result.current.handleSearch({ target: { value: 'hdd' } } as ChangeEvent<HTMLInputElement>);
      result.current.handleSearch({ target: { value: 'hdd s' } } as ChangeEvent<HTMLInputElement>);
    });

    waitFor(() => expect(setSearchValueMock).not.toHaveBeenCalled());
    vi.advanceTimersByTime(500);
    waitFor(() => expect(setSearchValueMock).toHaveBeenCalledWith('hdd s'));
  });

  it('should cancel debounce on component unmount', async () => {
    const setSearchValueMock = vi.fn();
    const { result, unmount } = renderHook(() => useSearchInput(), { wrapper });

    act(() => {
      result.current.handleSearch({ target: { value: 'hdd' } } as ChangeEvent<HTMLInputElement>);
    });
    unmount();
    vi.advanceTimersByTime(500);
    waitFor(() => expect(setSearchValueMock).not.toHaveBeenCalled());
  });
});
