import { renderHook } from 'utils/test';

import useDeleteDeviceView from './use-delete-device-view';

describe('useDeleteDeviceView', () => {
  it('should return actions information correctly', () => {
    const { result } = renderHook(() => useDeleteDeviceView());

    expect(result.current.actions).toEqual({
      primary: {
        onClick: expect.any(Function),
      },
      secondary: {
        label: 'Delete',
        onClick: expect.any(Function),
        variant: 'destructive',
      },
    });
  });
});
