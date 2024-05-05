import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { toast } from 'sonner';
import { store, useAppSelector } from 'store';
import { usePostDeviceMutation } from 'store/api';
import { afterEach, expect, it, vi } from 'vitest';

import { useDevicesActions, useModalActions } from 'hooks';

import { act, renderHook, renderWithProviders, waitFor } from 'utils/test';

import useAddDevice from './use-add-device';

const setup = (overrides = {}) => {
  const mockUseForm = {
    handleSubmit: vi.fn(callback => callback),
    register: vi.fn(),
    setValue: vi.fn(),
    getValues: vi.fn(() => ({ system_name: 'Test System' })),
    ...overrides,
  };
  const useForm = vi.fn();

  useForm.mockReturnValue(mockUseForm);
  return mockUseForm;
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));
vi.mock('store');
vi.mock('store/api', async importOriginal => {
  const actual = (await importOriginal()) as typeof importOriginal;
  return {
    ...actual,
    usePostDeviceMutation: vi.fn(),
  };
});

vi.mock('hooks', async importOriginal => {
  const actual = (await importOriginal()) as typeof importOriginal;
  return {
    ...actual,
    useModalActions: vi.fn(),
    useDevicesActions: vi.fn(() => ({ setSelectedDevice: vi.fn() })),
  };
});

const closeModalMock = vi.fn();

vi.mocked(useModalActions).mockReturnValue({
  closeModal: closeModalMock,
  openModal: vi.fn(),
  setModalView: vi.fn(),
});

describe('useAddDevice', () => {
  let result: { current: ReturnType<typeof useAddDevice> };
  let addDeviceMock: jest.Mock;

  beforeEach(() => {
    addDeviceMock = vi.fn(() => Promise.resolve()) as unknown as jest.Mock<unknown, unknown[]>;
    vi.mocked(useAppSelector).mockReturnValue({ selectedDevice: '1', devices: [] });
    (usePostDeviceMutation as jest.Mock).mockReturnValue([
      addDeviceMock,
      {
        isLoading: false,
        isSuccess: false,
        isSubmitting: false,
        isError: false,
        error: null,
      },
    ]);
    renderWithProviders(wrapper as unknown as ReactNode);
    const { result: hookResult } = renderHook(() => useAddDevice(), { wrapper });
    result = hookResult;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should call addDevice with the passed data when handleAddDevice is called', async () => {
    setup();
    const data = { system_name: 'New Device', type: 'server', hdd_capacity: 100 };
    await act(async () => {
      await result.current.onAddSubmit(data);
    });
    expect(addDeviceMock).toHaveBeenCalledWith({
      ...data,
      hdd_capacity: data.hdd_capacity.toString(),
    });
  });

  it('should show  a error toast when addDevice fails', async () => {
    setup();
    const error = new Error('Failed to add device');
    addDeviceMock.mockRejectedValueOnce(error);
    const data = { system_name: 'New Device', type: 'server', hdd_capacity: 100 };
    await act(async () => {
      await result.current.onAddSubmit(data);
    });
    waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(error.message);
    });
  });

  it('should close the modal and clear selected device on successful addition', async () => {
    setup();
    const data = { system_name: 'New Device', type: 'server', hdd_capacity: 100 };
    await act(async () => {
      await result.current.onAddSubmit(data);
    });
    waitFor(() => {
      expect(useModalActions().closeModal).toHaveBeenCalled();
      expect(useDevicesActions().setSelectedDevice).toHaveBeenCalledWith(null);
      expect(toast.success).toHaveBeenCalledWith(
        `The devices list was successfully updated with device ${data.system_name}`,
      );
    });
  });
});
