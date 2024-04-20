import { useAppSelector } from 'store';
import { useDeleteDeviceMutation } from 'store/api';
import { vi } from 'vitest';

import { useModalActions } from 'hooks';

import { act, renderHook } from 'utils/test';

import useDeleteDeviceView from './use-delete-device-view';

const mockToast = vi.fn();
vi.mock('sonner', () => ({
  toast: mockToast,
}));

vi.mock('store');
vi.mock('sonner');

vi.mock('store/api', async importOriginal => {
  const actual = (await importOriginal()) as typeof importOriginal;
  return {
    ...actual,
    useDeleteDeviceMutation: vi.fn(),
  };
});

vi.mock('hooks', async importOriginal => {
  const actual = (await importOriginal()) as typeof importOriginal;
  return {
    ...actual,
    useModalActions: vi.fn(),
  };
});

const closeModalMock = vi.fn();

vi.mocked(useModalActions).mockReturnValue({
  closeModal: closeModalMock,
  openModal: vi.fn(),
  setModalView: vi.fn(),
});
const mockDeleteDevice = vi.fn();

describe('useDeleteDeviceView', () => {
  beforeEach(() => {
    vi.mocked(useAppSelector).mockReturnValue({ selectedDevice: '1', devices: [] });

    vi.mocked(useDeleteDeviceMutation).mockReturnValue([
      mockDeleteDevice,
      { reset: vi.fn(), isLoading: false },
    ]);
  });

  it('should handle delete device', async () => {
    const { result } = renderHook(() => useDeleteDeviceView());

    await act(async () => {
      result.current.actions.secondary.onClick();
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isSubmitting).toBe(false);
  });

  it('should handle delete device', async () => {
    vi.mocked(useAppSelector).mockReturnValue({
      selectedDevice: '1',
      devices: [{ id: '1', system_name: 'test' }],
    });

    const { result } = renderHook(() => useDeleteDeviceView());

    await act(async () => {
      result.current.actions.secondary.onClick();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSubmitting).toBe(false);
    expect(mockDeleteDevice).toHaveBeenCalled();
  });

  it('should close modal', async () => {
    const { result } = renderHook(() => useDeleteDeviceView());
    await act(async () => {
      result.current.actions.primary.onClick();
    });

    expect(closeModalMock).toHaveBeenCalled();
  });
});
