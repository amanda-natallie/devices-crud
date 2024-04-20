import { useAppDispatch } from 'store';
import { resetDevicesInfoAction } from 'store/slices/devicesSlice';
import { vi } from 'vitest';

import { act, renderHook } from 'utils/test';

import useDevicesActions from './use-devices-actions';

vi.mock('store');

describe('useDevicesActions', () => {
  const mockDispatch = vi.fn();
  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('should dispatch resetDevicesInfoAction when resetDevicesInfo is called', () => {
    const { result } = renderHook(() => useDevicesActions());
    act(() => {
      result.current.resetDevicesInfo();
    });
    expect(mockDispatch).toHaveBeenCalledWith(resetDevicesInfoAction());
  });
});
