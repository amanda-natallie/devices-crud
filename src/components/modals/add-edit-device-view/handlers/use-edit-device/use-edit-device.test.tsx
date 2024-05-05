import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { toast } from 'sonner';
import { store, useAppSelector } from 'store';
import { useLazyGetDeviceByIdQuery, usePutDeviceMutation } from 'store/api';
import { afterEach, expect, it, vi } from 'vitest';

import { useDevicesActions, useModalActions } from 'hooks';

import { act, renderHook, renderWithProviders, waitFor } from 'utils/test';

import useEditDevice from './use-edit-device';

const setup = (overrides = {}) => {
  const mockUseForm = {
    handleSubmit: vi.fn(callback => callback),
    register: vi.fn(),
    setValue: vi.fn(),
    getValues: vi.fn(() => ({
      id: '1234',
      system_name: 'Test System',
      type: 'server',
      hdd_capacity: 100,
    })),
    ...overrides,
  };
  const useForm = vi.fn();

  useForm.mockReturnValue(mockUseForm);
  return mockUseForm;
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

vi.mock('store');
vi.mock('store/api', async importOriginal => {
  const actual = (await importOriginal()) as typeof importOriginal;
  return {
    ...actual,
    usePutDeviceMutation: vi.fn(),
    useLazyGetDeviceByIdQuery: vi.fn(),
  };
});

vi.mock('hooks', async importOriginal => {
  const actual = (await importOriginal()) as typeof importOriginal;
  return {
    ...actual,
    useModalActions: vi.fn(),
    useDevicesActions: vi.fn(() => ({ setSelectedDevice: vi.fn(), setDeviceFromAPI: vi.fn() })),
  };
});

const closeModalMock = vi.fn();

vi.mocked(useModalActions).mockReturnValue({
  closeModal: closeModalMock,
  openModal: vi.fn(),
  setModalView: vi.fn(),
});

describe('useEditDevice', () => {
  let result: { current: ReturnType<typeof useEditDevice> };
  let getByIDMock: jest.Mock;
  let editDeviceMock: jest.Mock;

  beforeEach(() => {
    editDeviceMock = vi.fn(() => Promise.resolve()) as unknown as jest.Mock<unknown, unknown[]>;
    getByIDMock = vi.fn(() =>
      Promise.resolve({
        data: { id: '1', system_name: 'Test System', type: 'server', hdd_capacity: 100 },
      }),
    ) as unknown as jest.Mock<unknown, unknown[]>;
    vi.mocked(useAppSelector).mockReturnValue({ selectedDevice: '1', devices: [] });
    (usePutDeviceMutation as jest.Mock).mockReturnValue([
      editDeviceMock,
      {
        isLoading: false,
        isSuccess: false,
        isSubmitting: false,
        isError: false,
        error: null,
      },
    ]);
    (useLazyGetDeviceByIdQuery as jest.Mock).mockReturnValue([
      getByIDMock,
      {
        isLoading: false,
        isSuccess: false,
        isSubmitting: false,
        isError: false,
        error: null,
        data: { id: '1', system_name: 'Test System', type: 'server', hdd_capacity: 100 },
      },
    ]);
    renderWithProviders(wrapper as unknown as ReactNode);
    const { result: hookResult } = renderHook(() => useEditDevice(), { wrapper });
    result = hookResult;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should call editDevice with the passed data when onEditSubmit is called', async () => {
    setup();
    const data = { id: '123', system_name: 'New Device', type: 'server', hdd_capacity: 100 };
    await act(async () => {
      await result.current.onEditSubmit(data);
    });
    waitFor(() => expect(editDeviceMock).toHaveBeenCalledWith(data));
  });

  it('should close the modal and clear selected device on successful addition', async () => {
    setup();
    const data = { id: '123', system_name: 'New Device', type: 'server', hdd_capacity: 100 };
    await act(async () => {
      await result.current.onEditSubmit(data);
    });
    waitFor(() => {
      expect(useModalActions().closeModal).toHaveBeenCalled();
      expect(useDevicesActions().setSelectedDevice).toHaveBeenCalledWith(null);
    });
  });
  it('should show  a error toast when addDevice fails', async () => {
    setup();
    const error = new Error('Failed to add device');
    editDeviceMock.mockRejectedValueOnce(error);
    const data = { system_name: 'New Device', type: 'server', hdd_capacity: 100 };
    await act(async () => {
      await result.current.onEditSubmit(data);
    });
    waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(error.message);
    });
  });
  it('should reset the form values when onCloseEdit is called', () => {
    setup();
    result.current.onCloseEdit();
    waitFor(() => expect(setup().setValue).toHaveBeenCalledWith('system_name', 'Test System'));
  });

  it('should show toast when no changes are made on submit', () => {
    setup();
    result.current.onCloseEdit();
    waitFor(() => expect(setup().setValue).toHaveBeenCalledWith('system_name', 'Test System'));
  });
  it('should setDeviceFromAPI to undefined when onCloseEdit is called', () => {
    setup();
    result.current.onCloseEdit();
    waitFor(() => expect(useDevicesActions().setDeviceFromAPI).toHaveBeenCalledWith(undefined));
  });
});
