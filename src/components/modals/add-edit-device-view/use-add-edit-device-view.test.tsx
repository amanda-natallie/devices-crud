import { useForm } from 'react-hook-form';

import { toast } from 'sonner';
import { vi } from 'vitest';

import { useDevicesActions, useModalActions } from 'hooks';

import { act, renderHook, waitFor } from 'utils/test';

import { useAddDevice, useEditDevice } from './handlers';
import useAddEditDeviceView from './use-add-edit-device-view';

vi.mock('react-hook-form', () => ({
  useForm: vi.fn(),
}));

vi.mock('./handlers', () => ({
  useAddDevice: vi.fn(),
  useEditDevice: vi.fn(),
}));

vi.mock('hooks', () => ({
  useModalActions: vi.fn(),
  useDevicesActions: vi.fn(),
}));

describe('useAddEditDeviceView', () => {
  beforeEach(() => {
    (useForm as jest.Mock).mockReturnValue({
      setValue: vi.fn(),
      handleSubmit: vi.fn(),
      reset: vi.fn(),
    });

    (useAddDevice as jest.Mock).mockReturnValue({
      isAddSubmiting: false,
      onAddSubmit: vi.fn(),
      onEditSubmit: vi.fn(),
    });

    (useEditDevice as jest.Mock).mockReturnValue({
      isEdit: false,
      isEditFetching: false,
      isEditSubmitting: false,
      deviceFromAPI: null,
      onEditSubmit: vi.fn(),
      onCloseEdit: vi.fn(),
    });

    (useModalActions as jest.Mock).mockReturnValue({
      closeModal: vi.fn(),
    });

    (useDevicesActions as jest.Mock).mockReturnValue({
      setSelectedDevice: vi.fn(),
    });
  });

  it('should return the correct initial state', () => {
    const { result } = renderHook(() => useAddEditDeviceView());
    expect(result.current.isEdit).toBe(false);
    expect(result.current.isFetching).toBe(false);
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.deviceFromAPI).toBe(null);
  });

  it('should handle form submission', () => {
    const { result } = renderHook(() => useAddEditDeviceView());
    act(() => {
      result.current.onSubmit({
        id: '1',
        system_name: 'Device1',
        type: 'WINDOWS_WORKSTATION',
        hdd_capacity: 500,
      });
    });
    expect(useAddDevice().onAddSubmit).toHaveBeenCalled();
  });

  it('should handle form cancellation', () => {
    const { result } = renderHook(() => useAddEditDeviceView());
    act(() => {
      result.current.actions.cancel.onClick();
    });
    expect(useModalActions().closeModal).toHaveBeenCalled();
    expect(useDevicesActions().setSelectedDevice).toHaveBeenCalledWith(null);
    expect(useEditDevice().onCloseEdit).toHaveBeenCalled();
  });
  it('should show toast when no changes were made', () => {
    const payload = {
      id: '1',
      system_name: 'Device1',
      type: 'WINDOWS_WORKSTATION',
      hdd_capacity: 500,
    };
    (useEditDevice as jest.Mock).mockReturnValue({
      isEdit: true,
      deviceFromAPI: payload,
      onCloseEdit: vi.fn(),
      onEditSubmit: vi.fn(),
    });
    const { result } = renderHook(() => useAddEditDeviceView());
    act(() => {
      result.current.onSubmit(payload);
    });
    waitFor(() => {
      expect(toast).toHaveBeenCalledWith('No changes were made. The device was not updated.');
    });
  });
  it('should call onEditSubmit when changes were made', () => {
    const payload = {
      id: '1',
      system_name: 'Device1',
      type: 'WINDOWS_WORKSTATION',
      hdd_capacity: 500,
    };
    (useEditDevice as jest.Mock).mockReturnValue({
      isEdit: true,
      deviceFromAPI: payload,
      onCloseEdit: vi.fn(),
      onEditSubmit: vi.fn(),
    });
    const { result } = renderHook(() => useAddEditDeviceView());
    act(() => {
      result.current.onSubmit({
        id: '1',
        system_name: 'Device2',
        type: 'WINDOWS_WORKSTATION',
        hdd_capacity: 500,
      });
    });
    expect(useEditDevice().onEditSubmit).toHaveBeenCalled();
  });
});
