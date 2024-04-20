import { MODAL_VIEWS_TYPE } from 'types';
import { vi } from 'vitest';

import { useDevicesActions, useModalActions } from 'hooks';

import { act, renderHook } from 'utils/test';

import useActionsMenu from './use-actions-menu';

vi.mock('hooks');

describe('useActionsMenu', () => {
  const mockSetModalView = vi.fn();
  const mockSetSelectedDevice = vi.fn();

  beforeEach(() => {
    (useModalActions as jest.Mock).mockReturnValue({
      setModalView: mockSetModalView,
    });

    (useDevicesActions as jest.Mock).mockReturnValue({
      setSelectedDevice: mockSetSelectedDevice,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should handle selected device', () => {
    const { result } = renderHook(() => useActionsMenu('1'));

    act(() => {
      result.current.handleSelectedDevice();
    });

    expect(mockSetSelectedDevice).toHaveBeenCalledWith('1');
  });

  it('should open edit modal', () => {
    const { result } = renderHook(() => useActionsMenu('1'));

    act(() => {
      result.current.openEditModal();
    });

    expect(mockSetSelectedDevice).toHaveBeenCalledWith('1');
    expect(mockSetModalView).toHaveBeenCalledWith(MODAL_VIEWS_TYPE.ADD_EDIT_DEVICE_VIEW);
  });

  it('should open delete modal', () => {
    const { result } = renderHook(() => useActionsMenu('1'));

    act(() => {
      result.current.openDeleteModal();
    });

    expect(mockSetSelectedDevice).toHaveBeenCalledWith('1');
    expect(mockSetModalView).toHaveBeenCalledWith(MODAL_VIEWS_TYPE.DELETE_DEVICE_VIEW);
  });
});
