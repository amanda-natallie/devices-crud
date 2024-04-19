import { renderHook } from 'utils/test';

import useAddEditDeviceView from './use-add-edit-device-view';

describe('useAddEditDeviceView', () => {
  it('should return actions information correctly', () => {
    const { result } = renderHook(() => useAddEditDeviceView());

    expect(result.current.actions).toEqual({
      primary: {
        onClick: expect.any(Function),
        className: 'text-primary hover:text-primary/80',
      },
      secondary: {
        label: 'Submit',
        onClick: expect.any(Function),
      },
    });
  });
});
