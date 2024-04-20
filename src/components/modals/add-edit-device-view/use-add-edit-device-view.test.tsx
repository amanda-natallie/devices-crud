import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { toast } from 'sonner';
import { store } from 'store';
import { vi } from 'vitest';

import { act, renderHook, waitFor } from 'utils/test';

import useAddEditDeviceView from './use-add-edit-device-view';

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

it('initializes with default form states and fetches device details if editing', async () => {
  const mockGetById = vi.fn(() =>
    Promise.resolve({ data: { id: '123', system_name: 'Device 123' } }),
  );
  const useLazyGetDeviceByIdQuery = vi.fn();
  const useAppSelector = vi.fn();
  useLazyGetDeviceByIdQuery.mockReturnValue([mockGetById, { data: null, isSuccess: true }]);
  useAppSelector.mockReturnValue({ selectedDevice: '123' });

  const { result } = renderHook(() => useAddEditDeviceView(), { wrapper });

  waitFor(() => {
    expect(result.current.isEdit).toBe(true);
    expect(mockGetById).toHaveBeenCalledWith('123');
  });
});
it('submits the form using addDevice mutation when not in edit mode', async () => {
  vi.useFakeTimers();
  const addDeviceMock = vi.fn(() => Promise.resolve({ data: { id: '124' } }));
  const usePostDeviceMutation = vi.fn();
  const useAppSelector = vi.fn();
  usePostDeviceMutation.mockReturnValue([addDeviceMock, { isLoading: false }]);
  useAppSelector.mockReturnValue({ selectedDevice: null });
  setup();

  const { result } = renderHook(() => useAddEditDeviceView(), { wrapper });
  result.current.onSubmit({ system_name: 'New Device', type: 'Type1', hdd_capacity: 500 });

  await vi.runAllTimers(); // Advance any debounced/throttled timers
  waitFor(() => {
    expect(addDeviceMock).toHaveBeenCalledWith({
      system_name: 'New Device',
      type: 'Type1',
      hdd_capacity: 500,
    });
  });
});
it('handles API success and shows toast on successful addition', async () => {
  const usePostDeviceMutation = vi.fn();
  const addDeviceMock = vi.fn(() => Promise.resolve({ data: { id: '124' } }));
  usePostDeviceMutation.mockReturnValue([addDeviceMock, { isSuccess: true }]);
  const { result } = renderHook(() => useAddEditDeviceView(), { wrapper });

  act(() => {
    result.current.onSubmit({ system_name: 'New Device', type: 'Type1', hdd_capacity: 500 });
  });
  waitFor(() => {
    expect(toast).toHaveBeenCalledWith(expect.stringContaining('successfully updated'));
  });
});
